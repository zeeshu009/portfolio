// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import UserDashboard from './components/UserDashboard';
import DoctorDashboard from './components/DoctorDashboard'; // Add this import
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './components/Unauthorized';
import PatientHistory from './components/PatientHistory'; // Import PatientHistory component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute allowedRoles={['patient', 'doctor']}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Login />} />
        <Route
  path="/patient-history"
  element={
    <ProtectedRoute allowedRoles={['patient']}>
      <PatientHistory />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;