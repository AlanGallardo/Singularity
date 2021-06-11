import express from 'express';
import mongoose from 'mongoose';

import CreditCardModel from '../models/creditCardSchema.js';

const router = express.Router();

export const getCreditCard = async (req, res) => {
  const { user } = req.params;

  try {
    const card = await CreditCardModel.find({ user: user });
    res.status(200).json(card);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createCreditCard = async (req, res) => {
  const card = req.body;
  const newCard = new CreditCardModel({ ...card, user: req.body.user.replace(/\s+/g, '') });

  try {
    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const deleteCreditCard = async (req, res) => {
  const { id } = req.params;
  
  if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No credit card with that user');
  
  await CreditCardModel.findByIdAndRemove(id);

  res.json({ message: 'Credit Card deleted successfully' });
}

export default router;