import express from 'express';
import { User } from '../models/user.js';
import {logout , loginUser, getallUser , getUserDetails, registerUser} from '../controllers/user.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router(); 


router.get('/all' , getallUser);
router.post('/new' , registerUser);
router.post('/login' , loginUser);
router.get('/logout' , logout);
router.get('/me' ,isAuthenticated, getUserDetails);

export default router;