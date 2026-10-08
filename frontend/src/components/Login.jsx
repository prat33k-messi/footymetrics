import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../api/config';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username: username,
        password: password
      });

      if (response.status === 200) {
        localStorage.setItem('uname', username);
        localStorage.setItem('upsw', password);
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        navigate('/dboard');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(typeof err.response.data === 'string' ? err.response.data : 'Invalid credentials');
      } else {
        // Fallback for demo when backend is offline
        if (username.trim()) {
          console.warn('Backend server offline. Entering preview mode.');
          localStorage.setItem('uname', username);
          localStorage.setItem('upsw', password || 'demo');
          localStorage.setItem('user', JSON.stringify({
            username: username,
            email: `${username.toLowerCase()}@club.com`,
            branch: 'Pro Squad FC',
            role: 'Forward'
          }));
          navigate('/dboard');
          return;
        }
        setError('Server unreachable. Please verify backend status.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <div className="card-header">
          <div className="card-icon-wrap">☵</div>
          <span className="brand-badge" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
            AUTHENTICATION // SECURE
          </span>
          <h2 className="card-title">SIGN IN</h2>
          <p className="card-subtitle">Access your player performance analytics and match metrics</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <span>✕</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Player Handle / Username</label>
            <input
              id="username"
              type="text"
              className="form-input"
              placeholder="e.g. Messi or Zidane"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError('');
              }}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '1.25rem' }}>
            {loading ? 'AUTHENTICATING...' : 'ACCESS DASHBOARD →'}
          </button>
        </form>

        <div className="auth-footer">
          New athlete profile? <Link to="/reg">Register player</Link>
        </div>
      </div>
    </div>
  );
}
