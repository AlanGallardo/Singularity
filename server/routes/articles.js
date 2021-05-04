import express from 'express';

import { getArticles } from '../controllers/articles';

const router = express.Router();

router.get('/', getArticles);

export default router;