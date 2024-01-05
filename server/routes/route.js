import express from 'express';
const route= express.Router();
import { addUser, getUsers} from '../controller/user-controller.js'; //.js extension is necessay to apply in backend

route.post('/add',addUser);
route.get('/users',getUsers);

export default route;