import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    branch: '',
    role: ''
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
      const response = await axios.post('http://localhost:8080/register', formData);
      if (response.status === 200) {
        alert('Registration done! Please login to continue.');
        navigate('/log');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(typeof err.response.data === 'string' ? err.response.data : 'Registration failed');
      } else {
        setError('Unable to reach server. Please ensure backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <div className="card-header">
          <div className="card-icon-wrap">⚽</div>
          <h2 className="card-title">Player Registration</h2>
          <p className="card-subtitle">Create your FootyMetrics athlete profile</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Player Name (Username)</label>
            <input
              id="username"
              type="text"
              name="username"
              className="form-input"
              placeholder="e.g. Lionel Messi or Zidane"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Official Email / Player ID</label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-input"
              placeholder="e.g. player@footymetrics.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Account Password</label>
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
            <label className="form-label" htmlFor="branch">Club / League / Country</label>
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
            <label className="form-label" htmlFor="role">Position / Tactical Role</label>
            <input
              id="role"
              type="text"
              name="role"
              className="form-input"
              placeholder="e.g. Forward, Midfielder, Playmaker"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Registering Player...' : 'Complete Registration'}
          </button>
        </form>

        <div className="auth-footer">
          Already registered? <Link to="/log">Sign in here</Link>
        </div>
      </div>
    </div>
  );
}
