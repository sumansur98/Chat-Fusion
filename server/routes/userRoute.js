import express from "express";
import { login, newUser, getMyProfile, logout, searchUser, sendFriendRequest, acceptFriendRequest, getAllNotifications, getMyFriends } from "../controllers/userController.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { acceptRequestValidator, loginValidator, registerValidator, sendRequestValidator, validateHandler } from "../lib/validators.js";

const router = express.Router();

router.post('/new', singleAvatar, registerValidator(), validateHandler, newUser)
router.post('/login',loginValidator(),validateHandler,  login)

//routes which require logged in user

router.use(isAuthenticated);

router.get('/my-profile', getMyProfile)
router.get('/logout', logout)
router.get('/search', searchUser)
router.put('/sendrequest',sendRequestValidator(), validateHandler, sendFriendRequest);
router.put('/acceptrequest',acceptRequestValidator(), validateHandler, acceptFriendRequest);
router.get('/notifications', getAllNotifications)
router.get('/friends', getMyFriends)

export default router;