import express from 'express';
import { uploadProfileImage } from '../utils/upload.js'
import { changePassword, getProfile, updateProfile, uploadImage } from '../controllers/profile.controller.js';

const router = express.Router();

router.get('/', getProfile);

router.post('/update', updateProfile);

router.post('/changePassword', changePassword);

router.post('/api/upload', uploadProfileImage , uploadImage )

export default router;