import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.create({ username, email, password });
  const token = signToken(user._id);
  res.status(201).json({ token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ msg: 'Incorrect email or password' });
  }

  const token = signToken(user._id);
  res.status(200).json({ token });
});

// Example of a protected route
router.get('/admin', protect, restrictTo('admin'), (req, res) => {
  res.status(200).json({ msg: 'Admin content' });
});

export default router;
