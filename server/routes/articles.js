import express from 'express';

import { getArticles, getArticlesBySearch, createArticle, updateArticle, deleteArticle, likeArticle } from '../controllers/articles.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getArticles);
router.get('/search', getArticlesBySearch);
router.post('/', auth, createArticle);
router.patch('/:id', auth, updateArticle);
router.delete('/:id', auth, deleteArticle);
router.patch('/:id/likeArticle', auth, likeArticle);

export default router;