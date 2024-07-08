import mongoose from "mongoose"
import jwt from "jsonwebtoken";

const cookieOptions = {
    maxAge : 1000 * 3600 * 24 * 15,
    sameSite : 'none',
    httpOnly : true,
    secure : true
}

const connectDB = (uri) => {
    mongoose.connect(uri, {dbName:'Chat_Fusion'})
    .then((data) => {
        console.log(`connected to database ${data.connection.host}`);
    }).catch((err) => {
        throw err;
    })
}

const sendToken = (res, user, code, message) => {
    //console.log('user', user);
    const token = jwt.sign({_id : user._id}, process.env.JWT_SECRET);

    return res.status(code).cookie("chat-token", token, cookieOptions).json({success : true, message})
}


export {connectDB, sendToken, cookieOptions}