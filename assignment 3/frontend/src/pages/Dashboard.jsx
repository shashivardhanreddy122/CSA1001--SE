import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiUsers, FiShoppingBag, FiCreditCard } from 'react-icons/fi';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import axios from 'axios';

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for initial render or API failure fallback
  const mockSales = [
    { name: 'Mon', sales: 4000, orders: 240 },
    { name: 'Tue', sales: 3000, orders: 139 },
    { name: 'Wed', sales: 2000, orders: 980 },
    { name: 'Thu', sales: 2780, orders: 390 },
    { name: 'Fri', sales: 1890, orders: 480 },
    { name: 'Sat', sales: 2390, orders: 380 },
    { name: 'Sun', sales: 3490, orders: 430 },
  ];

  const mockCategories = [
    { name: 'Electronics', value: 400 },
    { name: 'Clothing', value: 300 },
    { name: 'Books', value: 300 },
    { name: 'Home', value: 200 },
  ];

  useEffect(() => {
    // Attempting to fetch from our backend
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/dashboard');
        setSalesData(res.data.sales);
        setCategoryData(res.data.categories);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
        setSalesData(mockSales);
        setCategoryData(mockCategories);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-page">
      <h1 className="page-title">Dashboard Overview</h1>
      
      <div className="stats-grid">
        <StatCard title="Total Revenue" value="$54,239" change="+12.5%" isPositive={true} icon={<FiDollarSign size={24} />} />
        <StatCard title="Total Orders" value="1,245" change="+5.2%" isPositive={true} icon={<FiShoppingBag size={24} />} />
        <StatCard title="Total Customers" value="892" change="-1.2%" isPositive={false} icon={<FiUsers size={24} />} />
        <StatCard title="Avg. Order Value" value="$64.12" change="+2.4%" isPositive={true} icon={<FiCreditCard size={24} />} />
      </div>

      <div className="charts-grid">
        <div className="chart-card glass-panel">
          <h2 className="chart-title">Revenue vs Orders</h2>
          <div style={{ width: '100%', height: 300 }}>
            {loading ? <p>Loading chart...</p> : (
              <ResponsiveContainer>
                <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis yAxisId="left" stroke="#94a3b8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                  <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="chart-card glass-panel">
          <h2 className="chart-title">Sales by Category</h2>
          <div style={{ width: '100%', height: 300 }}>
            {loading ? <p>Loading chart...</p> : (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
      
      {/* Additional full-width charts can go here */}
      <div className="chart-card glass-panel" style={{ marginBottom: '2rem' }}>
          <h2 className="chart-title">Weekly Orders (Bar)</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="orders" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, isPositive, icon }) => (
  <div className="stat-card glass-panel">
    <div className="stat-header">
      <span>{title}</span>
      <div style={{ color: 'var(--accent-color)' }}>{icon}</div>
    </div>
    <div className="stat-value">{value}</div>
    <div className={`stat-change ${isPositive ? 'change-positive' : 'change-negative'}`}>
      {isPositive ? <FiTrendingUp /> : <FiTrendingDown />}
      {change} from last month
    </div>
  </div>
);

export default Dashboard;
