import express from 'express';

import {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  answerQuestion,
} from '../controllers/questions.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getQuestions);
router.get('/:id', getQuestion);
router.post('/', auth, createQuestion);
router.patch('/:id', auth, updateQuestion);
router.delete('/:id', auth, deleteQuestion);
router.patch('/:id/answerQuestion', auth, answerQuestion);

export default router;
