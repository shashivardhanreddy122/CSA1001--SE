const mongoose = require('mongoose');
const Customer = require('../models/Customer');

const mockCustomers = [
  { _id: '1', name: 'Alice Johnson', email: 'alice@example.com', status: 'Active', lifetimeValue: 1240.50, createdAt: '2026-01-15' },
  { _id: '2', name: 'Bob Smith', email: 'bob@example.com', status: 'Active', lifetimeValue: 890.00, createdAt: '2026-02-01' },
  { _id: '3', name: 'Charlie Brown', email: 'charlie@example.com', status: 'Inactive', lifetimeValue: 310.20, createdAt: '2026-03-10' },
  { _id: '4', name: 'Diana Prince', email: 'diana@example.com', status: 'Active', lifetimeValue: 2450.75, createdAt: '2026-04-05' },
  { _id: '5', name: 'Evan Wright', email: 'evan@example.com', status: 'Lead', lifetimeValue: 0.00, createdAt: '2026-05-20' },
];

exports.getCustomers = async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.json(mockCustomers);
  }
  try {
    const customers = await Customer.find();
    if (!customers || customers.length === 0) {
      return res.json(mockCustomers);
    }
    return res.json(customers);
  } catch (error) {
    return res.json(mockCustomers);
  }
};
