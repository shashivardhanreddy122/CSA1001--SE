exports.getDashboardStats = async (req, res) => {
  try {
    // Standard response structure
    res.json({
      sales: [
        { name: 'Mon', sales: 4000, orders: 240 },
        { name: 'Tue', sales: 3000, orders: 139 },
        { name: 'Wed', sales: 2000, orders: 980 },
        { name: 'Thu', sales: 2780, orders: 390 },
        { name: 'Fri', sales: 1890, orders: 480 },
        { name: 'Sat', sales: 2390, orders: 380 },
        { name: 'Sun', sales: 3490, orders: 430 },
      ],
      categories: [
        { name: 'Electronics', value: 400 },
        { name: 'Clothing', value: 300 },
        { name: 'Books', value: 300 },
        { name: 'Home', value: 200 },
      ],
      kpis: {
        totalRevenue: 54239,
        totalOrders: 1245,
        totalCustomers: 892,
        avgOrderValue: 64.12
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving dashboard analytics' });
  }
};
