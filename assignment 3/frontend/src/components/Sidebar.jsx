import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiShoppingBag, FiUsers, FiPieChart, FiSettings } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <FiPieChart size={24} color="var(--accent-color)" />
        E-Analytics
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <FiHome size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/orders" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <FiShoppingBag size={20} />
          <span>Orders</span>
        </NavLink>
        <NavLink to="/customers" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <FiUsers size={20} />
          <span>Customers</span>
        </NavLink>
        <NavLink to="/settings" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <FiSettings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
