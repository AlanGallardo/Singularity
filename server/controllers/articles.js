import express from 'express';
import mongoose from 'mongoose';

import ArticleModel from '../models/articleSchema.js';

const router = express.Router();

/**
 * Retrieves all the articles
 *
 * @param {*} req - The request
 * @param {*} res - The server response
 */
export const getArticles = async (req, res) => {
  // Recovering the page from the URL query
  const { page } = req.query;

  try {
    // Setting the limits for the pagination
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    
    // Find the first 8 articles.
    const total = await ArticleModel.countDocuments({});
    const articles = await ArticleModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
    
    res.status(200).json({ data: articles, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Retrieve an article by it's ID
 *
 * @param {*} req - The request
 * @param {*} res - The server response
 */
export const getArticle = async (req, res) => {
  // Recovering the id from the parameter
  const { id } = req.params;

  try {
    // Find the article by id
    const article = await ArticleModel.findById(id);
    res.status(200).json(article);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Retrieve articles by keyword or by tag
 *
 * @param {*} req - The request
 * @param {*} res - The server response
 */
export const getArticlesBySearch = async (req, res) => {
  // Recovering the keyword from the URL query
  const { searchQuery } = req.query;

  try {
    // Finding by keyword or by tag
    const title = new RegExp(searchQuery, 'i');
    const articles = await ArticleModel.find({ $or: [ { title }, { tags: title } ] });
    
    res.json({ data: articles });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Creates a new article
 *
 * @param {*} req - The request
 * @param {*} res - The server response
 */
export const createArticle = async (req, res) => {
  // Recovering the article data from the body of the request
  const article = req.body;

  // Creating a new article
  const newArticleModel = new ArticleModel({ ...article, author: req.userId, createdAt: new Date().toISOString() });

  try {
    // Saving the article
    await newArticleModel.save();
    res.status(201).json(newArticleModel);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/**
 * Updates an existing article
 *
 * @param {*} req - The request
 * @param {*} res - The server response
 */
export const updateArticle = async (req, res) => {
  // Recovering the id from the parameter
  const { id } = req.params;
  // Recovering the article data from the body of the request
  const { title, description, author, bannerImage, tags } = req.body;

  // If there's no existing id display a message
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No article with id: ${id}`);

  const updatedArticle = { author, title, description, tags, bannerImage, _id: id };
  
  // Find the article and update it
  await ArticleModel.findByIdAndUpdate(id, updatedArticle, { new: true });

  res.json(updatedArticle);
};

/**
 * Deletes an existing article
 *
 * @param {*} req - The request
 * @param {*} res - The server response
 */
export const deleteArticle = async (req, res) => {
  // Recovering the id from the parameter
  const { id } = req.params;

  // If there's no existing id display a message
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No article with that id');

  // Find the article and delete it
  await ArticleModel.findByIdAndRemove(id);

  res.json({ message: 'Article deleted successfully' });
};

/**
 * Likes the article
 *
 * @param {*} req - The request
 * @param {*} res - The server response
 */
export const likeArticle = async (req, res) => {
  // Recovering the id from the parameter
  const { id } = req.params;

  // If the user is not authenticated display a message
  if(!req.userId)
    return res.json({ message: 'Unauthenticated' });

  // If there's no existing id display a message
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No article with that id');

  // Find the article by id
  const article = await ArticleModel.findById(id);
  const index = article.likes.findIndex((id) => id === String(req.userId));

  // Insert in an array the user id, the number of likes will be the indexes of the array
  if(index === -1) {
    article.likes.push(req.userId);
  } else {
    article.likes = article.likes.filter((id) => id !== String(req.userId));
  }

  // Find the article and update it
  const updatedArticle = await ArticleModel.findByIdAndUpdate(id, article, { new: true });

  res.json(updatedArticle);
};

export default router;
