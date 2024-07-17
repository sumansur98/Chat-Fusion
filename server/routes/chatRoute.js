import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroupChat } from "../controllers/chatController.js";

const router = express.Router();


//routes which require logged in user

router.use(isAuthenticated);
router.post('/new', newGroupChat)


export default router;