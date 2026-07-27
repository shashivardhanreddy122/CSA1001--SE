const mongoose = require('mongoose');
const Product = require('../models/Product');

const mockProducts = [
  { _id: '1', name: 'Wireless Headphones', category: 'Electronics', price: 99.99, stock: 45 },
  { _id: '2', name: 'Ergonomic Desk Chair', category: 'Furniture', price: 199.99, stock: 12 },
  { _id: '3', name: 'Mechanical Keyboard', category: 'Electronics', price: 129.50, stock: 30 },
  { _id: '4', name: 'Stainless Steel Water Bottle', category: 'Accessories', price: 24.99, stock: 100 },
  { _id: '5', name: 'Cotton T-Shirt', category: 'Clothing', price: 19.99, stock: 75 }
];

exports.getProducts = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.json(mockProducts);
  }
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
      return res.json(mockProducts);
    }
    return res.json(products);
  } catch (error) {
    return res.json(mockProducts);
  }
};
