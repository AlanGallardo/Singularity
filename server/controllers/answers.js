import express from 'express';
import mongoose from 'mongoose';

import AnswerModel from '../models/answerSchema.js';

const router = express.Router();

/**
 * Retrieves an answer by it's ID
 *
 * @param {*} req - The request
 * @param {*} res - The server response
 */
export const getAnswer = async (req, res) => {
  // Recovering the id from the parameter
  const { id } = req.params;

  try {
    // Find the answer by id
    const answer = await AnswerModel.find({ questionId: id });
    res.status(200).json(answer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

/**
 * Creates an answer
 *
 * @param {*} req - The request
 * @param {*} res - The server response
 */
export const createAnswer = async (req, res) => {
  // Recovering the id from the parameter
  const { id: _id } = req.params;
  // Recovering the answer data from the body of the request
  const answer = req.body;

  // Creating the new answer
  const newAnswerModel = new AnswerModel({ ...answer, createdAt: new Date().toISOString() });

  try {
    // Saving the answer
    await newAnswerModel.save();
    res.status(201).json(newAnswerModel);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

/**
 * Updates an existing answer
 *
 * @param {*} req - The request
 * @param {*} res - The server response
 */
export const updateAnswer = async (req, res) => {
  // Recovering the id from the parameter
  const { id } = req.params;
  // Recovering the answer data from the body of the request
  const { answer, name, authorImage, questionId } = req.body;

  // If there's no existing id display a message
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No answer with id: ${id}`);

  const updatedAnswer = { answer, name, authorImage, questionId, _id: id };
  
  // Find the answer and update it
  await AnswerModel.findByIdAndUpdate(id, updatedAnswer, { new: true });

  res.json(updatedAnswer);
}

/**
 * Deletes an existing answer
 *
 * @param {*} req - The request
 * @param {*} res - The server response
 */
export const deleteAnswer = async (req, res) => {
  // Recovering the id from the parameter
  const { id } = req.params;

  // If there's no existing id display a message
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No answer with that id');

  // Find the answer and delete it
  await AnswerModel.findByIdAndRemove(id);

  res.json({ message: 'Answer deleted successfully' });
}

export default router;
