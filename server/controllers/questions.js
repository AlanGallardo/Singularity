import express from 'express';
import mongoose from 'mongoose';

import QuestionModel from '../models/questionSchema.js';

const router = express.Router();

/**
 * Retrieve all questions
 *
 * @param {*} req - The request
 * @param {*} res - The server response
 */
export const getQuestions = async (req, res) => {
  try {
    // Find all questions
    const questions = await QuestionModel.find();
    res.status(200).json({ data: questions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Retrieve a question by it's ID
 *
 * @param {*} req - The request
 * @param {*} res - The server response
 */
export const getQuestion = async (req, res) => {
  // Recovering the id from the parameter
  const { id } = req.params;

  try {
    // Find question by id
    const question = await QuestionModel.findById(id);
    res.status(200).json(question);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Creates a new question
 *
 * @param {*} req - The request
 * @param {*} res - The server response
 */
export const createQuestion = async (req, res) => {
  // Recovering the question from the body of the request
  const question = req.body;
  // Creating a new question
  const newQuestionModel = new QuestionModel({ ...question, name: req.userId, createdAt: new Date().toISOString() });

  try {
    // Saving the question
    await newQuestionModel.save();
    res.status(201).json(newQuestionModel);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/**
 * Updates an existing question
 *
 * @param {*} req - The request
 * @param {*} res - The server response
 */
export const updateQuestion = async (req, res) => {
  // Recovering the id from the parameter
  const { id } = req.params;
  // Recovering the question data from the body of the request
  const { title, description, name, authorImage, solved } = req.body;

  // If there's no existing id display a message
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No question with id: ${id}`);

  const updatedQuestion = { name, title, description, solved, authorImage, _id: id };
  
  // Find the question by id and update it
  await QuestionModel.findByIdAndUpdate(id, updatedQuestion, { new: true });

  res.json(updatedQuestion);
};

/**
 * Deletes an existing question
 *
 * @param {*} req - The request
 * @param {*} res - The server response
 */
export const deleteQuestion = async (req, res) => {
  // Recovering the id from the parameter
  const { id } = req.params;

  // If there's no existing id display a message
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No question with that id');

  // Find the question by id and delete it
  await QuestionModel.findByIdAndRemove(id);

  res.json({ message: 'Question deleted successfully' });
};

export default router;
