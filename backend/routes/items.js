const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET /api/items — all available items, optional ?category= filter
router.get('/', async (req, res) => {
  try {
    const filter = { available: true };
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const items = await Item.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/items/:id — single item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
