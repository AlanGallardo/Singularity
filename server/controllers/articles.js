import express from 'express';
import mongoose from 'mongoose';

import ArticleModel from '../models/articleSchema.js';

const router = express.Router();

export const getArticles = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8; // LIMIT OF ARTICLES PER PAGE
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await ArticleModel.countDocuments({});
    const articles = await ArticleModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    res.status(200).json({ data: articles, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await ArticleModel.findById(id);
    res.status(200).json(article);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getArticlesBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, 'i');
    const articles = await ArticleModel.find({ $or: [ { title }, { tags: { $in: tags.split(',') } }] });
    res.json({ data: articles });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createArticle = async (req, res) => {
  const article = req.body;
  const newArticleModel = new ArticleModel({ ...article, author: req.userId, createdAt: new Date().toISOString() });

  try {
    await newArticleModel.save();
    res.status(201).json(newArticleModel);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, description, author, bannerImage, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No article with id: ${id}`);

  const updatedArticle = { author, title, description, tags, bannerImage, _id: id };
  
  await ArticleModel.findByIdAndUpdate(id, updatedArticle, { new: true });

  res.json(updatedArticle);
}

export const deleteArticle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No article with that id');

  await ArticleModel.findByIdAndRemove(id);

  res.json({ message: 'Article deleted successfully' });
}

export const likeArticle = async (req, res) => {
  const { id } = req.params;

  if(!req.userId)
    return res.json({ message: 'Unauthenticated' });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No article with that id');

  const article = await ArticleModel.findById(id);
  const index = article.likes.findIndex((id) => id === String(req.userId));

  if(index === -1) {
    article.likes.push(req.userId);
  } else {
    article.likes = article.likes.filter((id) => id !== String(req.userId));
  }

  const updatedArticle = await ArticleModel.findByIdAndUpdate(id, article, { new: true });

  res.json(updatedArticle);
}

export default router;