import { User } from "../models/userModel.js";
import { sendToken } from "../utils/features.js";
import { compare } from "bcrypt";

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
const login = async(req, res) => {

    const {username, password} = req.body;

    const user = await User.findOne({username : username}).select("+password");
    console.log(user);

    if(!user) return res.status(401).json({success:false, message : 'Invalid Username'})

    const isMatch = await compare(password, user.password);

    if(!isMatch) return res.status(401).json({success:false, message : 'Invalid Password'})

    sendToken(res, user, 200, 'User logged in ' + user.name);
}

export { login, newUser };