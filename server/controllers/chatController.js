import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helpe.js";
import { Chat } from "../models/chatModel.js";
import { User } from "../models/userModel.js";
import { emitEvent } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

const newGroupChat = async(req, res, next) => {
    const {name, members} = req.body;

    if(members.length < 2) return next(new ErrorHandler('Group chat must have at least 3 members', 400));

    const allMembers = [...members, req.user_id];

    await Chat.create({
        name,
        groupChat : true,
        creator : req.user_id,
        members : allMembers
    })

    emitEvent(req, ALERT, allMembers, `Welcome to ${name} chat`);
    emitEvent(req, REFETCH_CHATS, members)

    return res.status(201).json({
        success : true,
        message : 'Group created'
    })
}

const getMyChat = async(req, res, next) => {
    
    const chats = await Chat.find({members : req.user_id}).populate("members", "name avatar");

    
    const transformedChats = chats.map(({_id, name, members, groupChat}) => {
        const otherMember = getOtherMember(req.user_id, members);
        return {
            _id,
            groupChat,
            avatar : groupChat ? members.slice(0,3).map(({avatar}) => avatar.url) : [otherMember.avatar.url],
            name : groupChat ? name : otherMember.name,
            members : members.reduce((acc, curr) => {
                if(curr._id.toString() !== req.user_id.toString()) acc.push(curr._id);
                return acc;
            }, [])
        }
    })

    return res.status(200).json({
        success : true,
        chats : transformedChats,
    })
}

const getMyGroups = async(req, res, next) => {
    const chats = await Chat.find({
        creator : req.user_id
    }).populate("members", "name avatar");

    console.log('chats',chats);

    const groups = chats.map(({_id, name, members, groupChat}) => {
        return {
            _id,
            groupChat,
            name,
            avatar : members.slice(0,3).map(({avatar}) => avatar.url)
        }
    })

    return res.status(201).json({
        success : true,
        groups
    })
}

const addMembers = async(req, res, next) => {
    const {chatId, members} = req.body;

    if(!members || members.length < 1) return next(new ErrorHandler('Please provide atleast one member', 404));

    const chat = await Chat.findById(chatId);

    if(!chat) return next(new ErrorHandler('Chat not found', 404));
    if(!chat.groupChat) return next(new ErrorHandler('Chat is not groupchat', 400));
    if(chat.creator.toString() !== req.user_id.toString()) return next(new ErrorHandler('You are not a creator, you cannot add members', 403));

    const allMembersPromise = members.map( i => User.findById(i));

    const allNewMembers = await Promise.all(allMembersPromise);

    const uniqueMembers = allNewMembers.filter(i => !chat.members.includes(i._id.toString())).map(i => i._id)

    chat.members.push(...uniqueMembers);

    if(chat.members.length > 10) return next(new ErrorHandler('Maximum limit reached', 400));

    chat.save();

    const allUsernames = allNewMembers.map(i => i.name).join(",");

    emitEvent(
        req,
        'ALERT',
        chat.members,
        `${allUsernames} have been added to the group`
    )

    emitEvent(req, 'REFETCH_CHATS', chat.members);

    res.status(200).json({
        success : true,
        message : 'User added successfully'
    })
}

const removeMember = async(req, res, next) => {
    const {userId, chatId} = req.body;

    const [chat, userWillBeRemoved] = await Promise.all([
        Chat.findById(chatId),
        User.findById(userId, "name")
    ]);
    if(!chat) return next(new ErrorHandler('Chat not found', 404));
    if(!chat.groupChat) return next(new ErrorHandler('Chat is not groupchat', 400));
    if(chat.creator.toString() !== req.user_id.toString()) return next(new ErrorHandler('You are not a creator, you cannot remove members', 403));
    if(chat.members.length <= 3) return next(new ErrorHandler('Group must have atleast 3 members', 403));

    chat.members = chat.members.filter((member) => member.toString() !== userId.toString());

    await chat.save();

    emitEvent(
        req,
        'ALERT',
        chat.members,
        `${userWillBeRemoved.name} have been added to the group`
    )

    emitEvent(req, 'REFETCH_CHATS', chat.members);

    res.status(200).json({
        success : true,
        message : 'Member removed successfully'
    })
}

const leaveGroup = async(req, res, next) => {

}

export {newGroupChat, getMyChat, getMyGroups, addMembers, removeMember, leaveGroup}