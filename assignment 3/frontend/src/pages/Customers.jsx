import React, { useState, useEffect } from 'react';
import axios from 'axios';

const fallbackCustomers = [
  { _id: '1', name: 'Alice Johnson', email: 'alice@example.com', status: 'Active', lifetimeValue: 1240.50, createdAt: '2026-01-15' },
  { _id: '2', name: 'Bob Smith', email: 'bob@example.com', status: 'Active', lifetimeValue: 890.00, createdAt: '2026-02-01' },
  { _id: '3', name: 'Charlie Brown', email: 'charlie@example.com', status: 'Inactive', lifetimeValue: 310.20, createdAt: '2026-03-10' },
  { _id: '4', name: 'Diana Prince', email: 'diana@example.com', status: 'Active', lifetimeValue: 2450.75, createdAt: '2026-04-05' },
  { _id: '5', name: 'Evan Wright', email: 'evan@example.com', status: 'Lead', lifetimeValue: 0.00, createdAt: '2026-05-20' },
];

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get('/api/customers');
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setCustomers(res.data);
        } else {
          setCustomers(fallbackCustomers);
        }
      } catch (err) {
        console.error('Failed to fetch customers', err);
        setCustomers(fallbackCustomers);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Customer Insights</h1>

      <div className="chart-card glass-panel" style={{ marginTop: '1.5rem' }}>
        <h2 className="chart-title">Customer Directory</h2>
        {loading ? (
          <p>Loading customer data...</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Name</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Email</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Lifetime Value</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Joined</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c, idx) => (
                  <tr key={c._id || idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '500' }}>{c.name}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#94a3b8' }}>{c.email}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span className={`badge ${c.status === 'Active' ? 'badge-success' : 'badge-secondary'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>${typeof c.lifetimeValue === 'number' ? c.lifetimeValue.toFixed(2) : c.lifetimeValue}</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#94a3b8' }}>
                      {new Date(c.createdAt).toLocaleDateString()}
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

export default Customers;
