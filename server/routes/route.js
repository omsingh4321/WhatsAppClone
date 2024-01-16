import express from 'express';
const route= express.Router();
import { addUser, getUsers} from '../controller/user-controller.js'; //.js extension is necessay to apply in backend
import { newConversation,getConversation} from '../controller/conversation-controller.js';
import { newMessage } from '../controller/message-controller.js';
route.post('/add',addUser);
route.get('/users',getUsers);
route.post('/conversation/add',newConversation);
route.post('/conversation/get',getConversation);
route.post('/message/add',newMessage);
export default route;