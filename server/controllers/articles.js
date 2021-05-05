import express from 'express';
import mongoose from 'mongoose';

import ArticleModel from '../models/articleSchema.js';

const router = express.Router();

export const getArticles = async(req, res) => {
    try {
        const articles = await ArticleModel.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createArticle = async (req, res) => {
  const { title, description, bannerImage, author, tags } = req.body;
  const newArticleModel = new ArticleModel({ title, description, bannerImage, author, tags })

  try {
      await newArticleModel.save();
      res.status(201).json(newArticleModel);
  } catch (error) {
      res.status(409).json({ message: error.message });
  }
}

export const updateArticle = async (req, res) => {
  const { id: _id } = req.params;
  const article = req.body;

  if(!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send('No article with that id');

  const updatedArticle = await ArticleModel.findByIdAndUpdate(_id, { ...article, _id}, { new: true });

  res.json(updatedArticle);
}

export const deleteArticle = async (req, res) => {
  const { id: _id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send('No article with that id');
  
  await ArticleModel.findByIdAndRemove(_id);

  res.json({ message: 'Article deleted successfully'});
}

export const likeArticle = async (req, res) => {
  const { id: _id } = req.params;
  
  if(!mongoose.Types.ObjectId.isValid(_id))
  return res.status(404).send('No article with that id');
  
  const article = await ArticleModel.findById(_id);
  const updatedArticle = await ArticleModel.findByIdAndUpdate(_id, { likes: article.likes + 1}, { new: true });

  res.json(updatedArticle);
}

export default router;