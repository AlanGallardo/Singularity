import express from 'express';

import {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '../controllers/questions.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Question Routes
router.get('/', getQuestions);
router.get('/:id', getQuestion);
router.post('/', auth, createQuestion);
router.patch('/:id', auth, updateQuestion);
router.delete('/:id', auth, deleteQuestion);

export default router;
