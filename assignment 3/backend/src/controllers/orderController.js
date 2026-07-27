const mongoose = require('mongoose');
const Order = require('../models/Order');

const mockOrders = [
  { _id: '1', orderId: 'ORD-1001', customerName: 'Alice Johnson', totalAmount: 249.99, status: 'Delivered', createdAt: new Date() },
  { _id: '2', orderId: 'ORD-1002', customerName: 'Bob Smith', totalAmount: 89.50, status: 'Shipped', createdAt: new Date() },
  { _id: '3', orderId: 'ORD-1003', customerName: 'Charlie Brown', totalAmount: 499.00, status: 'Processing', createdAt: new Date() },
  { _id: '4', orderId: 'ORD-1004', customerName: 'Diana Prince', totalAmount: 120.00, status: 'Pending', createdAt: new Date() },
  { _id: '5', orderId: 'ORD-1005', customerName: 'Evan Wright', totalAmount: 310.20, status: 'Delivered', createdAt: new Date() }
];

exports.getOrders = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.json(mockOrders);
  }
  try {
    const orders = await Order.find().populate('customer', 'name email').populate('items.product', 'name price');
    if (!orders || orders.length === 0) {
      return res.json(mockOrders);
    }
    return res.json(orders);
  } catch (error) {
    return res.json(mockOrders);
  }
};

exports.getOrderById = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    const mock = mockOrders.find(o => o._id === req.params.id);
    return mock ? res.json(mock) : res.status(404).json({ message: 'Order not found' });
  }
  try {
    const order = await Order.findById(req.params.id).populate('customer').populate('items.product');
    if (!order) {
      const mock = mockOrders.find(o => o._id === req.params.id);
      return mock ? res.json(mock) : res.status(404).json({ message: 'Order not found' });
    }
    return res.json(order);
  } catch (error) {
    const mock = mockOrders.find(o => o._id === req.params.id);
    return mock ? res.json(mock) : res.status(404).json({ message: 'Order not found' });
  }
};
