import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChat, getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments } from "../controllers/chatController.js";
import { attachmentsMulter } from "../middlewares/multer.js";

const router = express.Router();


//routes which require logged in user

router.use(isAuthenticated);
router.post('/new', newGroupChat)
router.get('/my', getMyChat)
router.get('/my/groups', getMyGroups)
router.put('/addmembers', addMembers);
router.put('/removemembers', removeMember);
router.delete('/leave/:id', leaveGroup);
router.post('/message', attachmentsMulter, sendAttachments);
router.get('/message/:id', getMessages);
router.route('/:id').get(getChatDetails).put(renameGroup).delete(deleteChat)


export default router; 