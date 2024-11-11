import express from 'express';
import {login, getLogin} from '../controllers/login.controller.js';

const router = express.Router();

router.get('/login', getLogin);

router.post('/login',login); 

export default router;