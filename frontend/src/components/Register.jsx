// src/components/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient',
    education: '',
    specialization: '',
    licenseNumber: '',
    experienceYears: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.register(formData); // Add register to api.js
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.errors?.map((e) => e.msg).join(', ') || 'Registration failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
          {formData.role === 'doctor' && (
            <>
              <input
                type="text"
                name="education"
                placeholder="Education"
                value={formData.education}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="licenseNumber"
                placeholder="License Number"
                value={formData.licenseNumber}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="experienceYears"
                placeholder="Experience Years"
                value={formData.experienceYears}
                onChange={handleChange}
                required
              />
            </>
          )}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;