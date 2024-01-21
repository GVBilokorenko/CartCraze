import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

const signAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const signRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
};

router.post('/signup', async (req, res) => {
  const { username, email, password, name, surname, phone } = req.body;
  // const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ username, email, password: password, name, surname, phone });

  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  res.status(201).json({ accessToken, refreshToken });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select('+password');

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ msg: 'Incorrect username or password' });
  }

  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  res.status(200).json({ accessToken, refreshToken });
});


router.post('/token', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  const user = await User.findOne({ refreshToken }).exec();
  if (!user) return res.sendStatus(403); // Forbidden if token is not found

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = signAccessToken(user._id);
    res.json({ accessToken });
  });
});

// Example of a protected route
router.get('/admin', protect, restrictTo('admin'), (req, res) => {
  res.status(200).json({ msg: 'Admin content' });
});

export default router;
