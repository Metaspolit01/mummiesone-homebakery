require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const itemsRouter = require('./routes/items');
const categoriesRouter = require('./routes/categories');
const ordersRouter = require('./routes/orders');
const adminRouter = require('./routes/admin');
const { seedDatabase } = require('./seed/defaultData');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Routes
app.use('/api/items', itemsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api', ordersRouter);          // covers /api/orders and /api/admin/orders
app.use('/api/admin', adminRouter);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// Connect to MongoDB then start server
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mummies-one')
  .then(async () => {
    console.log('Connected to MongoDB');
    await seedDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
