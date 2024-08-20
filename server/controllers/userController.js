import { User } from "../models/userModel.js";
import { cookieOptions, emitEvent, sendToken } from "../utils/features.js";
import { compare } from "bcrypt";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chatModel.js";
import { Request } from "../models/requestModel.js";
import { errorMiddleware } from "../middlewares/error.js";
import { NEW_REQUEST } from "../constants/events.js";

const newUser = async(req, res) => {

    const {name, username, password, bio} = req.body;

    console.log(req.body);

    const avatar = {
        public_id : 'sfafs',
        url : 'adsfsdaf',
    };
    const user = await User.create({
        name,
        username,
        password,
        bio,
        avatar
    })
    console.log('user created', user);

    sendToken(res, user, 201, 'user created')

    //res.status(201).json({message : 'user created successfully'})
}
const login = async(req, res, next) => {

    const {username, password} = req.body;

    const user = await User.findOne({username : username}).select("+password");
//    console.log(user);

    if(!user) return next(new ErrorHandler('Invalid Username', 404))

    const isMatch = await compare(password, user.password);

    if(!isMatch) return next(new ErrorHandler('Invalid Password', 404))

    sendToken(res, user, 200, 'User logged in ' + user.name);
}


const getMyProfile = async(req, res) => {

    const user = await User.findById(req.user_id);

    res.status(200).json({
        succcess : true,
        user
    })
}

const logout = (req, res, next) => {
    return res.status(200).cookie('chat-token', "",{...cookieOptions, maxAge : 0}).json({
        success : true,
        message : 'Logged out successfully'
    })
}

const searchUser = async (req, res, next) => {
   const {name=""} = req.query;

   //find all my chats
   const chats = await Chat.find({groupChat : false, members : req.user_id});

   //extract all users
   const allUsers = chats.map( chat => chat.members).flat();

   //all users except me and friends
   const allUsersExceptMeAndFriends = await User.find({
    _id : {$nin : allUsers},
    // name : {$regex : name, $options : 'i'}
   })

   const users = allUsersExceptMeAndFriends.map(({_id, name, avatar}) => (
    {
        _id,
        name,
        avatar : avatar.url
    }
   ))

   res.status(200).json({
    success : true,
    users
   })
}

const sendFriendRequest = async (req, res, next) => {

    const {userId} = req.body;

    const request = await Request.findOne({
        $or : [
            {sender : userId, receiver : req.user_id},
            {sender : req.user_id, receiver : userId},
        ]
    });

    if(request) return next(new ErrorHandler('Request already sent', 400));

    Request.create({
        sender : req.user_id,
        receiver : userId
    })

    emitEvent(req, NEW_REQUEST, [userId])

    return res.status(200).json({
        success : true,
        message : 'Request sent successfully'
    })
}

export { login, newUser, getMyProfile, logout, searchUser, sendFriendRequest };