// src/components/Unauthorized.jsx
function Unauthorized() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Unauthorized</h2>
        <p>You do not have permission to access this page.</p>
        <a href="/login">Go to Login</a>
      </div>
    </div>
  );
}

export default Unauthorized;