import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getMyChat, newGroupChat } from "../controllers/chatController.js";

const router = express.Router();


//routes which require logged in user

router.use(isAuthenticated);
router.post('/new', newGroupChat)
router.get('/my-chats', getMyChat)


export default router;