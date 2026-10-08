import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page-container">
      <div className="auth-card" style={{ maxWidth: '680px', textAlign: 'center', padding: '3.5rem 3rem' }}>
        <div className="card-icon-wrap" style={{ width: '64px', height: '64px', fontSize: '1.75rem' }}>
          ⚽
        </div>
        
        <span className="brand-badge" style={{ marginBottom: '1.25rem', display: 'inline-block' }}>
          PRO ATHLETIC INTELLIGENCE // V2.0
        </span>

        <h1 className="card-title" style={{ fontSize: '2.5rem', lineHeight: '1.15', margin: '0.5rem 0 1rem' }}>
          FOOTYMETRICS
        </h1>
        
        <p className="card-subtitle" style={{ fontSize: '0.95rem', margin: '0 auto 2.25rem', maxWidth: '480px', color: 'var(--text-secondary)' }}>
          High-performance analytics, scouting rosters, and career tracking designed for professional football players, coaches, and scouts.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
          <Link to="/reg" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ margin: 0, height: '48px' }}>
              REGISTER ATHLETE →
            </button>
          </Link>
          <Link to="/log" style={{ textDecoration: 'none' }}>
            <button className="btn-secondary" style={{ margin: 0, width: '100%', height: '48px', justifyContent: 'center' }}>
              SIGN IN
            </button>
          </Link>
        </div>

        {/* Minimalist Feature Pillars */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '1rem', 
          paddingTop: '2rem', 
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'left'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>01 // TELEMETRY</div>
            <div style={{ fontWeight: '600', fontSize: '0.88rem', marginTop: '0.25rem', color: '#fff' }}>Career Stats</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>G+A, GPM, and Impact Rating</div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>02 // LOGS</div>
            <div style={{ fontWeight: '600', fontSize: '0.88rem', marginTop: '0.25rem', color: '#fff' }}>Match History</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Log fixtures &amp; key milestones</div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>03 // SCOUT</div>
            <div style={{ fontWeight: '600', fontSize: '0.88rem', marginTop: '0.25rem', color: '#fff' }}>Leaderboard</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Rank &amp; compare squad players</div>
          </div>
        </div>
      </div>
    </div>
  );
}
