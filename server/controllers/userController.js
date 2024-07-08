import { User } from "../models/userModel.js";
import { cookieOptions, sendToken } from "../utils/features.js";
import { compare } from "bcrypt";
import { ErrorHandler } from "../utils/utility.js";

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

export { login, newUser, getMyProfile, logout };