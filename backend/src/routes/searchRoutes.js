import express from 'express';
import { searchEmails } from '../controllers/searchController.js';

const router = express.Router();
router.get('/', searchEmails);

export default router;
