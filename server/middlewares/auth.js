import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { adminSecretKey } from "../app.js";
import { TryCatch } from "./error.js";


const isAuthenticated = TryCatch( (req, res, next) => {
    //console.log('cookies',req.cookies);
   // console.log('is authentication middleware')

    const token = req.cookies['chat-token'];

    if(!token) return next(new ErrorHandler("Please login to access this route", 401))

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //console.log('decoded token', decoded);

    req.user_id = decoded._id;

    next();
})

const adminOnly = TryCatch( (req, res, next) => {
    const token = req.cookies["chat-admin-token"];
  
    if (!token)
      return next(new ErrorHandler("Only Admin can access this route", 401));
  
    const secretKey = jwt.verify(token, process.env.JWT_SECRET);
  
    const isMatched = secretKey === adminSecretKey;
  
    if (!isMatched)
      return next(new ErrorHandler("Only Admin can access this route", 401));
  
    next();
  });

export {isAuthenticated, adminOnly};