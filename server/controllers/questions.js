import express from 'express';
import mongoose from 'mongoose';

import QuestionModel from '../models/questionSchema.js';

const router = express.Router();

export const getQuestions = async (req, res) => {
  try {
    const questions = await QuestionModel.find();
    res.status(200).json({ data: questions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await QuestionModel.findById(id);
    res.status(200).json(question);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createQuestion = async (req, res) => {
  const question = req.body;
  const newQuestionModel = new QuestionModel({ ...question, name: req.userId, createdAt: new Date().toISOString() });

  try {
    await newQuestionModel.save();
    res.status(201).json(newQuestionModel);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { title, description, name, authorImage, solved } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No question with id: ${id}`);

  const updatedQuestion = { name, title, description, solved, authorImage, _id: id };
  
  await QuestionModel.findByIdAndUpdate(id, updatedQuestion, { new: true });

  res.json(updatedQuestion);
}

export const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No question with that id');

  await QuestionModel.findByIdAndRemove(id);

  res.json({ message: 'Question deleted successfully' });
}

export const answerQuestion = async (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;

  if(!req.userId)
    return res.json({ message: 'Unauthenticated' });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No question with that id');
  
  const question = await QuestionModel.findById(id);

  question.answers.push(answer);
  
  const updatedQuestion = await QuestionModel.findByIdAndUpdate(id, question, { new: true });

  res.json(updatedQuestion);
}

export default router;
