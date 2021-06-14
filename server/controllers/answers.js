import express from 'express';
import mongoose from 'mongoose';

import AnswerModel from '../models/answerSchema.js';

const router = express.Router();

export const getAnswer = async (req, res) => {
  const { id } = req.params;

  try {
    const answer = await AnswerModel.find({ questionId: id });
    res.status(200).json(answer);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createAnswer = async (req, res) => {
  const { id: _id } = req.params;

  const answer = req.body;
  const newAnswerModel = new AnswerModel({ ...answer, createdAt: new Date().toISOString() });

  try {
    await newAnswerModel.save();
    res.status(201).json(newAnswerModel);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updateAnswer = async (req, res) => {
  const { id } = req.params;
  const { answer, name, authorImage, questionId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No answer with id: ${id}`);

  const updatedAnswer = { answer, name, authorImage, questionId, _id: id };
  
  await AnswerModel.findByIdAndUpdate(id, updatedAnswer, { new: true });

  res.json(updatedAnswer);
}

export const deleteAnswer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No answer with that id');

  await AnswerModel.findByIdAndRemove(id);

  res.json({ message: 'Answer deleted successfully' });
}

export default router;
