require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/dashboard', require('./src/routes/dashboardRoutes'));
app.use('/api/orders', require('./src/routes/orderRoutes'));
app.use('/api/products', require('./src/routes/productRoutes'));
app.use('/api/customers', require('./src/routes/customerRoutes'));


app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is running' });
});

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB (Continuing without DB):', error.message));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
