import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMembers, getMyChat, getMyGroups, leaveGroup, newGroupChat, removeMember } from "../controllers/chatController.js";

const router = express.Router();


//routes which require logged in user

router.use(isAuthenticated);
router.post('/new', newGroupChat)
router.get('/my', getMyChat)
router.get('/my/groups', getMyGroups)
router.put('/addmembers', addMembers);
router.put('/removemembers', removeMember);
router.delete('/leave/:id', leaveGroup);


export default router; 