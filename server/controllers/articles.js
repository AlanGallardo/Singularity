import express from 'express';
import mongoose from 'mongoose';

import ArticleModel from '../models/articleSchema';

const router = express.Router();

export const getArticles = async(req, res) => {
    try {
        const articles = await ArticleModel.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}