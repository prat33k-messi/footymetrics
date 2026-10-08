import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Scout from './components/Scout';

function Navigation() {
  const location = useLocation();
  const uname = localStorage.getItem('uname');

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <span>FOOTYMETRICS</span>
        <span className="brand-badge">// PRO</span>
      </Link>
      <div className="nav-links">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active-btn' : ''}`}
        >
          Home
        </Link>
        <Link 
          to="/scout" 
          className={`nav-link ${location.pathname === '/scout' ? 'active-btn' : ''}`}
        >
          Scout Roster
        </Link>
        {uname ? (
          <Link 
            to="/dboard" 
            className={`nav-link ${location.pathname === '/dboard' ? 'active-btn' : ''}`}
          >
            Dashboard ({uname})
          </Link>
        ) : (
          <>
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
              Sign In
            </Link>
          </>
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
        <Route path="/scout" element={<Scout />} />
      </Routes>
    </Router>
  );
}

export default App;
