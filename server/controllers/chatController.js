import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { Chat } from "../models/chatModel.js";
import { emitEvent } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

const newGroupChat = async(req, res, next) => {
    const {name, members} = req.body;

    if(members.length < 2) return next(new ErrorHandler('Group chat must have at least 3 members', 400));

    const allMembers = [...members, req.user];

    await Chat.create({
        name,
        groupChat : true,
        creator : req.user,
        members : allMembers
    })

    emitEvent(req, ALERT, allMembers, `Welcome to ${name} chat`);
    emitEvent(req, REFETCH_CHATS, members)

    return res.status(201).json({
        success : true,
        message : 'Group created'
    })
}

export {newGroupChat}