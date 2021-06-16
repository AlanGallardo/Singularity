import express from 'express';

import { signin, signup, updateUser } from '../controllers/users.js';

const router = express.Router();

// User Routes
router.post('/signin', signin);
router.post('/signup', signup);
router.patch('/:id', updateUser);

export default router;