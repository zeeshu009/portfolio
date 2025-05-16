import React from 'react';
import { useLocation } from 'react-router-dom';
import './ErrorPage.css';

function ErrorPage({ onLogin, loading, error }) {
  const location = useLocation();
  const isApiRoute = location.pathname.startsWith('/api');

  return (
    <div className="error-page">
      <h2>404 - Access Denied</h2>
      <p>
        {isApiRoute
          ? 'API endpoints cannot be accessed directly. Please log in to use the Task Manager.'
          : 'You must log in to access the Task Manager.'}
      </p>
    </div>
  );
}

export default ErrorPage;