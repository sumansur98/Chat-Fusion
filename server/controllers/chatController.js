import {
  ALERT,
  NEW_ATTACHMENT,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/events.js";
import { getOtherMember } from "../lib/helpe.js";
import { Chat } from "../models/chatModel.js";
import { Message } from "../models/messageModel.js";
import { User } from "../models/userModel.js";
import { deleteFilesFromCloudinary, emitEvent } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

const newGroupChat = async (req, res, next) => {
  const { name, members } = req.body;

  const allMembers = [...members, req.user_id];

  await Chat.create({
    name,
    groupChat: true,
    creator: req.user_id,
    members: allMembers,
  });

  emitEvent(req, ALERT, allMembers, `Welcome to ${name} chat`);
  emitEvent(req, REFETCH_CHATS, members);

  return res.status(201).json({
    success: true,
    message: "Group created",
  });
};

const getMyChat = async (req, res, next) => {
  const chats = await Chat.find({ members: req.user_id }).populate(
    "members",
    "name avatar"
  );

  const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
    const otherMember = getOtherMember(req.user_id, members);
    return {
      _id,
      groupChat,
      avatar: groupChat
        ? members.slice(0, 3).map(({ avatar }) => avatar.url)
        : [otherMember.avatar.url],
      name: groupChat ? name : otherMember.name,
      members: members.reduce((acc, curr) => {
        if (curr._id.toString() !== req.user_id.toString()) acc.push(curr._id);
        return acc;
      }, []),
    };
  });

  return res.status(200).json({
    success: true,
    chats: transformedChats,
  });
};

const getMyGroups = async (req, res, next) => {
  const chats = await Chat.find({
    creator: req.user_id,
  }).populate("members", "name avatar");

  console.log("chats", chats);

  const groups = chats.map(({ _id, name, members, groupChat }) => {
    return {
      _id,
      groupChat,
      name,
      avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
    };
  });

  return res.status(201).json({
    success: true,
    groups,
  });
};

const addMembers = async (req, res, next) => {
  const { chatId, members } = req.body;
  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("Chat is not groupchat", 400));
  if (chat.creator.toString() !== req.user_id.toString())
    return next(
      new ErrorHandler("You are not a creator, you cannot add members", 403)
    );

  const allMembersPromise = members.map((i) => User.findById(i));

  const allNewMembers = await Promise.all(allMembersPromise);

  const uniqueMembers = allNewMembers
    .filter((i) => !chat.members.includes(i._id.toString()))
    .map((i) => i._id);

  chat.members.push(...uniqueMembers);

  if (chat.members.length > 10)
    return next(new ErrorHandler("Maximum limit reached", 400));

  chat.save();

  const allUsernames = allNewMembers.map((i) => i.name).join(",");

  emitEvent(
    req,
    "ALERT",
    chat.members,
    `${allUsernames} have been added to the group`
  );

  emitEvent(req, "REFETCH_CHATS", chat.members);

  res.status(200).json({
    success: true,
    message: "User added successfully",
  });
};

const removeMember = async (req, res, next) => {
  const { userId, chatId } = req.body;

  const [chat, userWillBeRemoved] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId, "name"),
  ]);
  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("Chat is not groupchat", 400));
  if (chat.creator.toString() !== req.user_id.toString())
    return next(
      new ErrorHandler("You are not a creator, you cannot remove members", 403)
    );
  if (chat.members.length <= 3)
    return next(new ErrorHandler("Group must have atleast 3 members", 403));

  chat.members = chat.members.filter(
    (member) => member.toString() !== userId.toString()
  );

  await chat.save();

  emitEvent(
    req,
    "ALERT",
    chat.members,
    `${userWillBeRemoved.name} have been added to the group`
  );

  emitEvent(req, "REFETCH_CHATS", chat.members);

  res.status(200).json({
    success: true,
    message: "Member removed successfully",
  });
};

const leaveGroup = async (req, res, next) => {
  const chatId = req.params.id.toString();

  const chat = await Chat.findById(chatId);
  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("Chat is not groupchat", 400));

  const remainingMembers = chat.members.filter(
    (member) => member.toString() !== req.user_id.toString()
  );

  if (chat.creator.toString() === req.user_id.toString()) {
    const newCreator = remainingMembers[0];
    chat.creator = newCreator;
  }

  chat.members = remainingMembers;

  await chat.save();

  const user = User.findById(req.user_id, "name");
  emitEvent(req, "ALERT", chat.members, `${user.name} has left the group`);

  res.status(200).json({
    success: true,
    message: "Group Left successfully",
  });
};

const sendAttachments = async (req, res, next) => {
  const { chatId } = req.body;

  const [chat, user] = await Promise.all([
    Chat.findById(chatId),
    User.findById(req.user_id, "name"),
  ]);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  const files = req.files || [];

  if (files.length < 1)
    return next(new ErrorHandler("No attachements uploaded", 400));

  const attachments = {};

  const messageForDB = {
    content: "",
    attachments,
    sender: req.user_id,
    chat: chatId,
  };

  const messageForRealTime = {
    ...messageForDB,
    sender: {
      _id: user._id,
      name: user.name,
    },
  };

  const message = await Message.create(messageForDB);

  emitEvent(req, NEW_ATTACHMENT, chat.members, {
    message: messageForRealTime,
    chatId,
  });

  emitEvent(req, NEW_MESSAGE_ALERT, chat.members, {
    chatId,
  });

  res.status(200).json({
    success: true,
    message,
  });
};

const getChatDetails = async (req, res, next) => {
  if (req.query.populate === "true") {
    const chat = await Chat.findById(req.params.id)
      .populate("members", "name avatar")
      .lean();

    if (!chat) return next(new ErrorHandler("Chat not found", 404));

    chat.members = chat.members.map((_id, name, avatar) => ({
      _id,
      name,
      avatar: avatar.url,
    }));

    return res.status(200).json({
      success: true,
      chat,
    });
  } else {
    const chat = await Chat.findById(req.params.id);

    if (!chat) return next(new ErrorHandler("Chat not found", 404));

    return res.status(200).json({
      success: true,
      chat,
    });
  }
};

const renameGroup = async (req, res, next) => {
  const chatId = req.params.id;
  const { name } = req.body;

  const chat = await Chat.findById(chatId);
  console.log("here1");

  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 401));
  if (chat.creator.toString() !== req.user_id.toString())
    return next(new ErrorHandler("You cannot rename this chat", 403));

  console.log("here2");
  chat.name = name;
  await chat.save();
  console.log("here3");
  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Group renamed successfully",
  });
};

const deleteChat = async (req, res, next) => {
  const chatId = req.params.id;

  const chat = await Chat.findById(chatId);
  const members = chat.members;
  console.log("here1");

  if (!chat) return next(new ErrorHandler("Chat not found", 404));
  if (chat.groupChat && chat.creator.toString !== req.user_id.toString())
    return next(
      new ErrorHandler("You are not allowed to delete the group", 403)
    );
  if (!chat.groupChat && !members.includes(req.user_id.toString()))
    return next(
      new ErrorHandler("You are not allowed to delete the group", 403)
    );

  const messagesWithAttachments = await Message.find({
    chat: chatId,
    attachments: { $exists: true, $ne: [] },
  });

  const public_ids = [];

  messagesWithAttachments.forEach(({ attachments }) =>
    attachments.forEach(({ public_id }) => public_ids.push(public_id))
  );

  await Promise.all([
    deleteFilesFromCloudinary(public_ids),
    chat.deleteOne(),
    Message.deleteMany({chat : chatId})
  ])

  emitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "Chat Deleted Successfully",
  });
  
};

const getMessages = async (req, res,next) => {
  const chatId = req.params.id;
  const {page = 1} = req.query;
  const limit = 20;
  const skip = (page -1) * limit

  const messages = await Message.find({chat : chatId})
  .sort({createdAt : -1})
  .skip(skip)
  .limit(limit)
  .populate("sender", "name")
  .lean()

  const totalMessagesCount = await Message.countDocuments({chat : chatId});

  const totalPages = Math.ceil(totalMessagesCount / limit)

  return res.status(200).json({
    success : true,
    message : messages.reverse(),
    totalPages
  })
}

export {
  newGroupChat,
  getMyChat,
  getMyGroups,
  addMembers,
  removeMember,
  leaveGroup,
  sendAttachments,
  getChatDetails,
  renameGroup,
  deleteChat,
  getMessages
};
