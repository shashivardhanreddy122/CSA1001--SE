import React from 'react';

const Settings = () => {
  return (
    <div className="dashboard-page">
      <h1 className="page-title">Settings</h1>

      <div className="chart-card glass-panel" style={{ marginTop: '1.5rem', maxWidth: '600px' }}>
        <h2 className="chart-title">System Configurations</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Store Name</label>
            <input 
              type="text" 
              defaultValue="My Global E-Commerce Store" 
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                color: '#fff'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Admin Email Notifications</label>
            <select 
              defaultValue="enabled"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                color: '#fff'
              }}
            >
              <option value="enabled">Enabled (Daily Summaries)</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>

          <button 
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              alignSelf: 'flex-start',
              marginTop: '0.5rem'
            }}
            onClick={() => alert('Settings saved successfully!')}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
