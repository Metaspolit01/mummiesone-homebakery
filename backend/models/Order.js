const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    itemId: { type: String, required: true },
    itemName: { type: String, required: true },
    userName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    deliveryType: { type: String, enum: ['door', 'pickup'], required: true },
    paymentMethod: { type: String, enum: ['UPI', 'COD'], required: true },
    orderDate: { type: Date, default: Date.now },
    deliveryDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    customDescription: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
