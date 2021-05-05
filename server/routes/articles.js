import express from 'express';

import { getArticles, createArticle, updateArticle, deleteArticle, likeArticle } from '../controllers/articles.js';

const router = express.Router();

router.get('/', getArticles);
router.post('/', createArticle);
router.patch('/:id', updateArticle);
router.delete('/:id', deleteArticle);
router.patch('/:id/likeArticle', likeArticle);

export default router;