import express from 'express';

import {
  getAnswer,
  createAnswer,
  updateAnswer,
  deleteAnswer,
} from '../controllers/answers.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', getAnswer);
router.post('/', auth, createAnswer);
router.patch('/:id', auth, updateAnswer);
router.delete('/:id', auth, deleteAnswer);

export default router;
