import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/TaskManager/Navbar';
import Home from './components/TaskManager/Home.jsx';
import About from './pages/About.jsx';
import ErrorPage from './components/TaskManager/ErrorPage.jsx';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setLoginLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
      });
      const data = await response.json();
      const newToken = data.token;
      setToken(newToken);
      localStorage.setItem('token', newToken);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message || 'Login failed. Ensure the backend server is running.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    setIsAuthenticated(false);
    setError(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Navbar
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onLogout={handleLogout}
        loginLoading={loginLoading}
      />
      <Routes>
        <Route path="/" element={<Home token={token} isAuthenticated={isAuthenticated} />} />
        <Route path="/about" element={<About />} />
        {/* Handle API routes explicitly */}
        <Route path="/api/*" element={<ErrorPage />} />
        {/* Catch-all route for other undefined paths */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {error && <div className="error">{error}</div>}
    </Router>
  );
}

export default App;