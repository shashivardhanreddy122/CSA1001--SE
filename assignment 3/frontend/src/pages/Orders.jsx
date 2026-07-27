import React, { useState, useEffect } from 'react';
import axios from 'axios';

const fallbackOrders = [
  { _id: '1', orderId: 'ORD-1001', customerName: 'Alice Johnson', totalAmount: 249.99, status: 'Delivered', createdAt: '2026-07-25' },
  { _id: '2', orderId: 'ORD-1002', customerName: 'Bob Smith', totalAmount: 89.50, status: 'Shipped', createdAt: '2026-07-26' },
  { _id: '3', orderId: 'ORD-1003', customerName: 'Charlie Brown', totalAmount: 499.00, status: 'Processing', createdAt: '2026-07-26' },
  { _id: '4', orderId: 'ORD-1004', customerName: 'Diana Prince', totalAmount: 120.00, status: 'Pending', createdAt: '2026-07-27' },
  { _id: '5', orderId: 'ORD-1005', customerName: 'Evan Wright', totalAmount: 310.20, status: 'Delivered', createdAt: '2026-07-27' }
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders');
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setOrders(res.data);
        } else {
          setOrders(fallbackOrders);
        }
      } catch (err) {
        console.error('Failed to fetch orders', err);
        setOrders(fallbackOrders);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'delivered': return 'badge-success';
      case 'shipped': return 'badge-info';
      case 'processing': return 'badge-warning';
      default: return 'badge-secondary';
    }
  };

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Orders Management</h1>

      <div className="chart-card glass-panel" style={{ marginTop: '1.5rem' }}>
        <h2 className="chart-title">Recent Orders</h2>
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Order ID</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Customer</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Total Amount</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={order._id || idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 'bold' }}>{order.orderId || `#${(order._id || '').substring(0, 6)}`}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>{order.customerName || (order.customer && order.customer.name) || 'Guest'}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>${typeof order.totalAmount === 'number' ? order.totalAmount.toFixed(2) : order.totalAmount}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: '#94a3b8' }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
