import { body, validationResult, check } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const registerValidator = () => [
    body("name", "Please enter name").notEmpty(),
    body("username", "Please enter username").notEmpty(),
    body("password", "Please enter password").notEmpty(),
    body("bio", "Please enter bio").notEmpty(),
    check('avatar', 'Please upload avatar').notEmpty()
]

const loginValidator = () => [
    body("username", "Please enter username").notEmpty(),
    body("password", "Please enter password").notEmpty(),
]

const validateHandler = (req, res, next) => {
    const errors = validationResult(req);
    const allErrorMsg = errors.array().map( error => error.msg).join(', ')

    console.log(allErrorMsg);

    if(errors.isEmpty()) return next();
    else return next(new ErrorHandler(allErrorMsg));
}

const newGroupValidator = () => [
    body("name", "Please enter name").notEmpty(),
    body("members").notEmpty().withMessage('please enter members').isArray({min:2, max:50}).withMessage('members should be between 2-50'),
]

export {registerValidator, validateHandler, loginValidator, newGroupValidator}