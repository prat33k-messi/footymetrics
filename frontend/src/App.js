import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function Navigation() {
  const location = useLocation();
  const uname = localStorage.getItem('uname');

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <span>⚡ FootyMetrics</span>
        <span className="brand-badge">Pro Analytics</span>
      </Link>
      <div className="nav-links">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active-btn' : ''}`}
        >
          Home
        </Link>
        <Link 
          to="/reg" 
          className={`nav-link ${location.pathname === '/reg' ? 'active-btn' : ''}`}
        >
          Register
        </Link>
        <Link 
          to="/log" 
          className={`nav-link ${location.pathname === '/log' ? 'active-btn' : ''}`}
        >
          Login
        </Link>
        {uname && (
          <Link 
            to="/dboard" 
            className={`nav-link ${location.pathname === '/dboard' ? 'active-btn' : ''}`}
          >
            Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/log" element={<Login />} />
        <Route path="/dboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
