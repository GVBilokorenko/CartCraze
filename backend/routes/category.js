import express from 'express';
import Category from '../models/Category.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// Create a new category
// router.post('/add', protect, restrictTo('admin'),  async (req, res) => {
router.post('/add', async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = await Category.create({ name, description });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

export default router;
