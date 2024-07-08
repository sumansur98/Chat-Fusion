import express from "express";
import { login, newUser, getMyProfile, logout } from "../controllers/userController.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post('/new', singleAvatar, newUser)
router.post('/login', login)

//routes which require logged in user

router.use(isAuthenticated);

router.get('/my-profile', getMyProfile)
router.get('/logout', logout)

export default router;