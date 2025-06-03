// src/components/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await api.login(email, password);
      console.log('Login response:', data); // Debug
      if (!data.token || !data.role) {
        throw new Error('Invalid response format: missing token or role');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      console.log('Stored in localStorage:', { token: data.token, role: data.role }); // Debug

      switch (data.role) {
        case 'admin':
          navigate('/dashboard/users');
          break;
        case 'patient':
          navigate('/user-dashboard');
          break;
        case 'doctor':
          navigate('/doctor-dashboard');
          break;
        default:
          throw new Error(`Unknown role: ${data.role}`);
      }
    } catch (err) {
      console.error('Login error:', err, err.response?.data); // Debug
      setError(err.response?.data?.error || err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Login</h2>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-3 py-2 rounded-md text-white focus:outline-none transition-colors ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;