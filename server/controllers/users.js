import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import userSchema from '../models/userSchema.js';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userSchema.findOne({ email });
    
    if(!existingUser)
    return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if(!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "2h" });
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    console.log(error);
  }
}

export const signup = async (req, res) => {
  const { email, password, confirm, firstName, lastName } = req.body;

  try {
    const existingUser = await userSchema.findOne({ email });

    if(existingUser)
      return res.status(400).json({ message: "User already exists." });
    
    if(password !== confirm)
      return res.status(400).json({ message: "Password don't match." });
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await userSchema.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
    const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

    res.status(201).json({ result: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    console.log(error);
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, isPremium } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);

  const updatedUser = { name, email, isPremium, _id: id };
  
  await userSchema.findByIdAndUpdate(id, updatedUser, { new: true });

  res.json(updatedUser);
}
