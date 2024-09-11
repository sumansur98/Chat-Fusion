import { User } from "../models/userModel.js";
import { cookieOptions, emitEvent, sendToken } from "../utils/features.js";
import { compare } from "bcrypt";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chatModel.js";
import { Request } from "../models/requestModel.js";
import { errorMiddleware, TryCatch } from "../middlewares/error.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";

const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;

  console.log(req.body);

  const avatar = {
    public_id: "sfafs",
    url: "adsfsdaf",
  };
  const user = await User.create({
    name,
    username,
    password,
    bio,
    avatar,
  });
  console.log("user created", user);

  sendToken(res, user, 201, "user created");

  //res.status(201).json({message : 'user created successfully'})
};
const login = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username }).select("+password");
  //    console.log(user);

  if (!user) return next(new ErrorHandler("Invalid Username", 404));

  const isMatch = await compare(password, user.password);

  if (!isMatch) return next(new ErrorHandler("Invalid Password", 404));

  sendToken(res, user, 200, "User logged in " + user.name);
};

const getMyProfile = TryCatch( async (req, res) => {
  console.log('get my profile api');  
  const user = await User.findById(req.user_id);

  res.status(200).json({
    succcess: true,
    user,
  });
});

const logout = (req, res, next) => {
  return res
    .status(200)
    .cookie("chat-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};

const searchUser = async (req, res, next) => {
  const { name = "" } = req.query;

  //find all my chats
  const chats = await Chat.find({ groupChat: false, members: req.user_id });

  //extract all users
  const allUsers = chats.map((chat) => chat.members).flat();

  //all users except me and friends
  const allUsersExceptMeAndFriends = await User.find({
    _id: { $nin: allUsers },
    // name : {$regex : name, $options : 'i'}
  });

  const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }));

  res.status(200).json({
    success: true,
    users,
  });
};

const sendFriendRequest = async (req, res, next) => {
  const { userId } = req.body;

  const request = await Request.findOne({
    $or: [
      { sender: userId, receiver: req.user_id },
      { sender: req.user_id, receiver: userId },
    ],
  });

  if (request) return next(new ErrorHandler("Request already sent", 400));

  Request.create({
    sender: req.user_id,
    receiver: userId,
  });

  emitEvent(req, NEW_REQUEST, [userId]);

  return res.status(200).json({
    success: true,
    message: "Request sent successfully",
  });
};

const acceptFriendRequest = async (req, res, next) => {
  const { requestId, accept } = req.body;

  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");

  if (!request) return next(new ErrorHandler("No request found", 404));
  if (request.receiver._id.toString !== req.user_id.toString())
    return next(new ErrorHandler("Unauthorized", 401));

  if (!accept) {
    request.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Friend request rejected",
    });
  }

  const members = [request.sender._id, request.receiver._id];
  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name}-${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);

  emitEvent(req, REFETCH_CHATS, members);

  res.status(200).json({
    success : true,
    message:"friend request accepted",
    senderId : request.sender._id,
  })

};

const getAllNotifications = async (req, res, next) => {
    const requests = await Request.find({receiver : req.user_id}).populate('sender', 'name avatar')

    const allRequests = requests.map(({_id, sender}) => ({
        _id,
        sender : {
            _id : sender._id,
            name : sender.name,
            avatar : sender.avatar.url
        }
    }))

    res.status(200).json({
        succcess : true,
        allRequests
    })
}

const getMyFriends = async (req, res) => {
    const chatId = req.query.chatId;
  
    const chats = await Chat.find({
      members: req.user,
      groupChat: false,
    }).populate("members", "name avatar");
  
    const friends = chats.map(({ members }) => {
      const otherUser = getOtherMember(members, req.user);
  
      return {
        _id: otherUser._id,
        name: otherUser.name,
        avatar: otherUser.avatar.url,
      };
    });
  
    if (chatId) {
      const chat = await Chat.findById(chatId);
  
      const availableFriends = friends.filter(
        (friend) => !chat.members.includes(friend._id)
      );
  
      return res.status(200).json({
        success: true,
        friends: availableFriends,
      });
    } else {
      return res.status(200).json({
        success: true,
        friends,
      });
    }
  };


export {
  login,
  newUser,
  getMyProfile,
  logout,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getAllNotifications,
  getMyFriends
};
