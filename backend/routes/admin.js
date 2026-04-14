const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Item = require('../models/Item');
const Category = require('../models/Category');
const { verifyAdminToken } = require('../middleware/auth');

// POST /api/admin/login — hardcoded admin credentials
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign(
      { role: 'admin', username: 'admin' },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '24h' }
    );
    return res.json({ token });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

// ─── Items (admin) ────────────────────────────────────────────────────────────

// GET /api/admin/items — all items including unavailable
router.get('/items', verifyAdminToken, async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/admin/items — create item
router.post('/items', verifyAdminToken, async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/admin/items/:id — update item
router.put('/items/:id', verifyAdminToken, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /api/admin/items/:id — delete item
router.delete('/items/:id', verifyAdminToken, async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PATCH /api/admin/items/:id/toggle — toggle available field
router.patch('/items/:id/toggle', verifyAdminToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    item.available = !item.available;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ─── Categories (admin) ───────────────────────────────────────────────────────

// GET /api/admin/categories
router.get('/categories', verifyAdminToken, async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST /api/admin/categories
router.post('/categories', verifyAdminToken, async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/admin/categories/:id
router.put('/categories/:id', verifyAdminToken, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /api/admin/categories/:id
router.delete('/categories/:id', verifyAdminToken, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
