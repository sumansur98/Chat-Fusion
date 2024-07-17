import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../lib/helpe.js";
import { Chat } from "../models/chatModel.js";
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

}

export {newGroupChat, getMyChat, getMyGroups}