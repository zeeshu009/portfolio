// src/components/ProtectedRoute.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children, allowedRoles }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else if (allowedRoles && !allowedRoles.includes(role)) {
      navigate('/unauthorized'); // Redirect to an unauthorized page or handle differently
    }
  }, [token, role, allowedRoles, navigate]);

  return token && (!allowedRoles || allowedRoles.includes(role)) ? children : null;
}

export default ProtectedRoute;