import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

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
      const response = await axios.post('http://localhost:8080/login', {
        username: username,
        password: password
      });

      if (response.status === 200) {
        // As specified: store uname and upsw into localStorage and navigate to /dboard
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
        setError('Login failed. Please verify credentials or backend status.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <div className="card-header">
          <div className="card-icon-wrap">🔐</div>
          <h2 className="card-title">FootyMetrics Login</h2>
          <p className="card-subtitle">Access your player performance analytics</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Player Name / Username</label>
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

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className="auth-footer">
          Don't have a profile yet? <Link to="/reg">Register player</Link>
        </div>
      </div>
    </div>
  );
}
