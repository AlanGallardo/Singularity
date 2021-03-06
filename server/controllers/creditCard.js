import express from 'express';
import mongoose from 'mongoose';

import CreditCardModel from '../models/creditCardSchema.js';

const router = express.Router();

/**
 * Retrieve the credit card by user name
 *
 * @param {*} req - The request
 * @param {*} res - The server response
 */
export const getCreditCard = async (req, res) => {
  // Recovering the user name from the parameter
  const { user } = req.params;

  try {
    // Find the card by user name
    const card = await CreditCardModel.find({ user: user });
    res.status(200).json(card);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Creates a new credit card
 *
 * @param {*} req - The request
 * @param {*} res - The server response
 */
export const createCreditCard = async (req, res) => {
  // Recovering the credit card from the body of the request
  const card = req.body;
  // Creating a new credit card
  const newCard = new CreditCardModel({ ...card, user: req.body.user.replace(/\s+/g, '') });

  try {
    // Saving the credit card
    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/**
 * Deletes an existing credit card
 *
 * @param {*} req - The request
 * @param {*} res - The server response
 */
export const deleteCreditCard = async (req, res) => {
  // Recovering the id from the parameter
  const { id } = req.params;
  
  // If there's no existing id display a message
  if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No credit card with that user');
  
  // Find the credit card by id and delete it
  await CreditCardModel.findByIdAndRemove(id);

  res.json({ message: 'Credit Card deleted successfully' });
};

export default router;