import express from 'express';

import {
  getCreditCard,
  createCreditCard,
  deleteCreditCard,
} from '../controllers/creditCard.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Credit Card Routes
router.get('/:user', getCreditCard);
router.post('/', auth, createCreditCard);
router.delete('/:id', auth, deleteCreditCard);

export default router;
