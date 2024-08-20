import { body, validationResult, check, param } from "express-validator";
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
    const allErrorMsg = errors.array().map(error => error.msg).join(', ')

    console.log(allErrorMsg);

    if (errors.isEmpty()) return next();
    else return next(new ErrorHandler(allErrorMsg));
}

const newGroupValidator = () => [
    body("name", "Please enter name").notEmpty(),
    body("members").notEmpty().withMessage('please enter members').isArray({ min: 2, max: 50 }).withMessage('members should be between 2-50'),
]

const addMemberValidator = () => [
    body("chatId", "Please enter chat id").notEmpty(),
    body("members").notEmpty().withMessage('please enter members').isArray({ min: 1, max: 47 }).withMessage('members should be between 1-47'),
]

const removeMemberValidator = () => [
    body("chatId", "Please enter chat id").notEmpty(),
    body("userId", "Please enter user id").notEmpty(),
]

const leaveGroupValidator = () => [
    param("id", "Please enter chat id").notEmpty(),
]

const sendAttachmentsValidator = () => [
    body("chatId", "Please enter chat id").notEmpty(),
    check("files").notEmpty().withMessage('please attach files').isArray({ min: 1, max: 5 }).withMessage('files should be between 1-5')
]

const getMessagesValidator = () => [
    param("id", "Please enter chat id").notEmpty(),
]

const sendRequestValidator = () => [
    body("userId", "Please enter user id").notEmpty(),
]

export { registerValidator, validateHandler, loginValidator, newGroupValidator, addMemberValidator, removeMemberValidator, leaveGroupValidator, sendAttachmentsValidator, getMessagesValidator, sendRequestValidator }