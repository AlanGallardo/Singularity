import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import userSchema from '../models/userSchema.js';

/**
 * This is the SignIn function, retrieves an existing user
 *
 * @param {*} req - The request
 * @param {*} res - The server response
 */
export const signin = async (req, res) => {
  // Recovering the email and password from the body of the request
  const { email, password } = req.body;

  try {
    // Finding the user by the email
    const existingUser = await userSchema.findOne({ email });
    
    // If the user doesn't exist display a message
    if(!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    // Checking if the password given is correct
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    // If the password isn't correct display a message
    if(!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    // JWT gives us the user token with an expiration time of 2 hours
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "2h" });
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    console.log(error);
  }
};

/**
 * This is the SignUp function, it creates a new user
 *
 * @param {*} req - The request
 * @param {*} res - The server response
 */
export const signup = async (req, res) => {
  // Recovering the user data from the body of the request
  const { email, password, confirm, firstName, lastName } = req.body;

  try {
    // Finding the user by the email
    const existingUser = await userSchema.findOne({ email });

    // If the user already exists display a message
    if(existingUser)
      return res.status(400).json({ message: "User already exists." });
    
    // If the password isn't equal to the repeat password field display a message
    if(password !== confirm)
      return res.status(400).json({ message: "Password don't match." });
    
    // Hashing the password for security reasons
    const hashedPassword = await bcrypt.hash(password, 12);

    // Creating the user
    const result = await userSchema.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    // JWT gives us the user token with an expiration time of 2 hours
    const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

    res.status(201).json({ result: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
    console.log(error);
  }
};

/**
 * This function updates the user
 *
 * @param {*} req - The request
 * @param {*} res - The server response
 */
export const updateUser = async (req, res) => {
  // Recovering the id from the parameter
  const { id } = req.params;
  // Recovering the user data from the body of the request
  const { name, email, isPremium, imageUrl } = req.body;

  // If there's no id found display a message
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);

  const updatedUser = { name, email, isPremium, imageUrl, _id: id };
  
  // Find the user by id and update it
  await userSchema.findByIdAndUpdate(id, updatedUser, { new: true });

  res.json(updatedUser);
};
