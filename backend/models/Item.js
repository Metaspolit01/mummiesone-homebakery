const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String },
    price: { type: Number, required: true },
    description: { type: String },
    imageUrl: { type: String },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);
