import express from 'express';
import { suggestReplies} from '../controllers/replyController.js';

const router = express.Router();
router.post('/', suggestReplies);

export default router;
