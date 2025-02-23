import express from 'express';
import { categorizeAndStoreEmail} from '../controllers/categorizeController.js';

const router = express.Router();
router.post('/', categorizeAndStoreEmail);

export default router;
