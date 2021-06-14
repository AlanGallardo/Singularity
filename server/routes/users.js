import express from 'express';

import { getUsers, signin, signup, updateUser } from '../controllers/users.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.patch('/:id', updateUser);

export default router;