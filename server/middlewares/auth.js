import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";


const isAuthenticated = (req, res, next) => {
    console.log('cookies',req.cookies);

    const token = req.cookies['chat-token'];

    if(!token) return next(new ErrorHandler("Please login to access this route", 401))

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('decoded token', decoded);

    req.user_id = decoded._id;

    next();
}

export {isAuthenticated};