import express from 'express';
import { suggestReplies} from '../controllers/replyContainer.js';

const router = express.Router();
router.post('/', suggestReplies);

export default router;
