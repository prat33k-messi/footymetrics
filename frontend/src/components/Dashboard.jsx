import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  const navigate = useNavigate();
  const uname = localStorage.getItem('uname');
  const upsw = localStorage.getItem('upsw');
  const [userData, setUserData] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    if (!uname || !upsw) {
      navigate('/log');
      return;
    }
    const cachedUser = localStorage.getItem('user');
    if (cachedUser) {
      try {
        setUserData(JSON.parse(cachedUser));
      } catch (e) {
        console.error(e);
      }
    }
  }, [uname, upsw, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('uname');
    localStorage.removeItem('upsw');
    localStorage.removeItem('user');
    navigate('/log');
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/update', {
        username: uname,
        password: upsw,
        npassword: newPassword
      });
      if (res.status === 200) {
        setUpdateMsg('Password updated successfully! Please re-login.');
        localStorage.setItem('upsw', newPassword);
        setTimeout(() => {
          setShowPasswordModal(false);
          setUpdateMsg('');
        }, 1500);
      }
    } catch (err) {
      setUpdateMsg('Failed to update password.');
    }
  };

  return (
    <div className="page-container" style={{ alignItems: 'flex-start' }}>
      <div className="dashboard-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Player Performance Dashboard</h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Welcome back, <strong style={{ color: 'var(--accent-green)' }}>{uname || 'Player'}</strong>!
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              onClick={() => setShowPasswordModal(!showPasswordModal)}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '0.6rem 1.2rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Update Password
            </button>
            <button 
              onClick={handleLogout}
              style={{
                background: 'rgba(239, 68, 68, 0.2)',
                color: '#f87171',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                padding: '0.6rem 1.2rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Profile Card */}
        {userData && (
          <div className="stat-card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(18, 24, 38, 0.9))' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="stat-badge">{userData.role || 'Player Role'}</span>
                <h2 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{userData.username}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{userData.email}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Club / League</span>
                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#38bdf8' }}>{userData.branch}</div>
              </div>
            </div>
          </div>
        )}

        {/* Career Stats Grid */}
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginTop: '2rem' }}>Career Performance Metrics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-title">Goals Scored</div>
            <div className="stat-value" style={{ color: '#10b981' }}>28</div>
            <span className="stat-badge">Top 5% League</span>
          </div>

          <div className="stat-card">
            <div className="stat-title">Assists Provided</div>
            <div className="stat-value" style={{ color: '#38bdf8' }}>14</div>
            <span className="stat-badge">Key Playmaker</span>
          </div>

          <div className="stat-card">
            <div className="stat-title">Matches / Appearances</div>
            <div className="stat-value" style={{ color: '#fbbf24' }}>32</div>
            <span className="stat-badge">Starting XI regular</span>
          </div>
        </div>

        {/* Password Update Modal / Section */}
        {showPasswordModal && (
          <div className="auth-card" style={{ maxWidth: '400px', marginTop: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Change Password</h3>
            {updateMsg && (
              <div className="alert alert-success" style={{ marginBottom: '1rem' }}>
                {updateMsg}
              </div>
            )}
            <form onSubmit={handlePasswordUpdate}>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-primary">Update</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
