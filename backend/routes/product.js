import express from 'express';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// Create a new product
// router.post('/add', protect, restrictTo('admin'),  async (req, res) => {
router.post('/add', async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  try {
    const product = await Product.create({ name, description, price, category, stock });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    let query = {};
    const { category } = req.query;

    if (category) {
      // Find the category ID from the name
      const categoryDoc = await Category.findOne({ name: category });
      if (categoryDoc) {
        query.category = categoryDoc._id;
      } else {
        return res.status(404).json({ msg: 'Category not found' });
      }
    }

    const products = await Product.find(query).populate('category');
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

export default router;
