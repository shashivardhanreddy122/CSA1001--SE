require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Product = require('../src/models/Product');
const Customer = require('../src/models/Customer');
const Order = require('../src/models/Order');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    await Product.deleteMany({});
    await Customer.deleteMany({});
    await Order.deleteMany({});

    const customers = await Customer.insertMany([
      { name: 'Alice Johnson', email: 'alice@example.com', status: 'Active', lifetimeValue: 1240.50 },
      { name: 'Bob Smith', email: 'bob@example.com', status: 'Active', lifetimeValue: 890.00 },
      { name: 'Charlie Brown', email: 'charlie@example.com', status: 'Inactive', lifetimeValue: 310.20 },
      { name: 'Diana Prince', email: 'diana@example.com', status: 'Active', lifetimeValue: 2450.75 }
    ]);

    const products = await Product.insertMany([
      { name: 'Wireless Headphones', category: 'Electronics', price: 99.99, stock: 45 },
      { name: 'Ergonomic Desk Chair', category: 'Furniture', price: 199.99, stock: 12 },
      { name: 'Mechanical Keyboard', category: 'Electronics', price: 129.50, stock: 30 }
    ]);

    await Order.insertMany([
      {
        customer: customers[0]._id,
        items: [{ product: products[0]._id, quantity: 1, price: 99.99 }],
        totalAmount: 99.99,
        status: 'Delivered'
      },
      {
        customer: customers[1]._id,
        items: [{ product: products[1]._id, quantity: 1, price: 199.99 }],
        totalAmount: 199.99,
        status: 'Shipped'
      }
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
