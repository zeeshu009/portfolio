import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated, onLogin, onLogout, loginLoading }) {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
      </div>
      <div className="nav-auth">
        {isAuthenticated ? (
          <button onClick={onLogout} className="nav-btn logout-btn">
            Log Out
          </button>
        ) : (
          <button onClick={onLogin} className="nav-btn" disabled={loginLoading}>
            {loginLoading ? 'Logging in...' : 'Log In'}
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;