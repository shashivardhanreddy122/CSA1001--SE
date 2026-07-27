import React from 'react';
import { FiSearch, FiBell, FiUser } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="header glass-panel">
      <div className="search-bar">
        <FiSearch color="var(--text-muted)" />
        <input 
          type="text" 
          placeholder="Search across dashboard..." 
          className="search-input"
        />
      </div>
      
      <div className="header-actions">
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
          <FiBell size={20} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%', 
            background: 'var(--accent-color)', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', color: '#fff'
          }}>
            <FiUser size={18} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '500' }}>Admin User</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>admin@store.com</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
