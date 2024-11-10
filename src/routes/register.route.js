import express from 'express';
import { createProfile, getRegister } from '../controllers/register.controller.js';
import { validateProfileCreation } from '../middleware/validateQuery.js';

const router = express.Router();

router.get('/register', getRegister);

router.post('/registerForm',validateProfileCreation, createProfile);

export default router;