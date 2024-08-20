import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChat, getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments } from "../controllers/chatController.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import { addMemberValidator, getMessagesValidator, leaveGroupValidator, newGroupValidator, removeMemberValidator, sendAttachmentsValidator, validateHandler } from "../lib/validators.js";

const router = express.Router();


//routes which require logged in user

router.use(isAuthenticated);
router.post('/new',newGroupValidator(), validateHandler, newGroupChat)
router.get('/my', getMyChat)
router.get('/my/groups', getMyGroups)
router.put('/addmembers',addMemberValidator(), validateHandler, addMembers);
router.put('/removemembers',removeMemberValidator(), validateHandler, removeMember);
router.delete('/leave/:id',leaveGroupValidator(), validateHandler, leaveGroup);
router.post('/message', attachmentsMulter,sendAttachmentsValidator(), validateHandler, sendAttachments);
router.get('/message/:id',getMessagesValidator(), validateHandler, getMessages);
router.route('/:id').get(getChatDetails).put(renameGroup).delete(deleteChat)


export default router; 