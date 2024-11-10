import express from 'express';
import { getProfiles,searchProfiles,deleteProfileById } from '../controllers/admin.controller.js';

const router = express.Router();

 router.get('/', getProfiles);

router.get('/search', searchProfiles)

router.get('/:id', deleteProfileById);

export default router;