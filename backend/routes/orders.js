const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { verifyAdminToken } = require('../middleware/auth');

// POST /api/orders — create new order (public)
router.post('/', async (req, res) => {
  try {
    const {
      itemId,
      itemName,
      userName,
      phone,
      address,
      deliveryType,
      paymentMethod,
      deliveryDate,
      customDescription,
    } = req.body;

    if (!itemId || !itemName || !userName || !phone || !deliveryType || !paymentMethod || !deliveryDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const order = new Order({
      itemId,
      itemName,
      userName,
      phone,
      address,
      deliveryType,
      paymentMethod,
      deliveryDate: new Date(deliveryDate),
      customDescription,
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/admin/orders — all orders (protected), optional ?status= filter
router.get('/admin/orders', verifyAdminToken, async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const orders = await Order.find(filter).sort({ orderDate: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PATCH /api/admin/orders/:id/status — update order status (protected)
router.patch('/admin/orders/:id/status', verifyAdminToken, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Accepted', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Status updated', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
