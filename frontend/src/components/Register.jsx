import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../api/config';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    branch: '',
    role: 'Forward'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, formData);
      if (response.status === 200) {
        alert('Athlete registration confirmed. Please sign in to access telemetry.');
        navigate('/log');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(typeof err.response.data === 'string' ? err.response.data : 'Registration failed');
      } else {
        setError('Server unreachable. Ensure the backend service is running.');
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
            REGISTRATION // ATHLETE
          </span>
          <h2 className="card-title">CREATE PROFILE</h2>
          <p className="card-subtitle">Register player identity into the FootyMetrics global database</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <span>✕</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Player Handle / Name</label>
            <input
              id="username"
              type="text"
              name="username"
              className="form-input"
              placeholder="e.g. Messi or Zidane"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Official Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-input"
              placeholder="player@club.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Security Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="branch">Club / Organization / Country</label>
            <input
              id="branch"
              type="text"
              name="branch"
              className="form-input"
              placeholder="e.g. Inter Miami or Real Madrid"
              value={formData.branch}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="role">Tactical Position</label>
            <select
              id="role"
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="Forward">Forward (ST / CF / Winger)</option>
              <option value="Playmaker">Playmaker (CAM / No. 10)</option>
              <option value="Midfielder">Midfielder (CM / CDM)</option>
              <option value="Defender">Defender (CB / Fullback)</option>
              <option value="Goalkeeper">Goalkeeper (GK)</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '1.25rem' }}>
            {loading ? 'REGISTERING...' : 'CONFIRM REGISTRATION →'}
          </button>
        </form>

        <div className="auth-footer">
          Already registered? <Link to="/log">Sign in here</Link>
        </div>
      </div>
    </div>
  );
}
