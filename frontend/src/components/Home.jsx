import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page-container">
      <div className="auth-card" style={{ maxWidth: '640px', textAlign: 'center' }}>
        <div className="card-icon-wrap" style={{ width: '70px', height: '70px', fontSize: '2.2rem' }}>
          🏆
        </div>
        <h1 className="card-title" style={{ fontSize: '2.2rem' }}>FootyMetrics</h1>
        <p className="card-subtitle" style={{ fontSize: '1.05rem', margin: '1rem 0 2rem' }}>
          Football Player Performance &amp; Analytics Management System. Track match performance, goals, assists, and player progression with precision data.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
          <Link to="/reg" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ margin: 0 }}>
              Register Player
            </button>
          </Link>
          <Link to="/log" style={{ textDecoration: 'none' }}>
            <button 
              className="btn-primary" 
              style={{ 
                margin: 0, 
                background: 'rgba(255, 255, 255, 0.08)', 
                color: '#fff', 
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: 'none'
              }}
            >
              Sign In
            </button>
          </Link>
        </div>

        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            ⚡ Powered by Spring Boot 3 + MySQL JPA &amp; React SPA
          </p>
        </div>
      </div>
    </div>
  );
}
