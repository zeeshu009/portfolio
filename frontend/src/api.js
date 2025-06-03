import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  login: async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    return response.data;
  },
  register: async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, formData);
    return response.data;
  },
  getUsers: async () => {
    const response = await axios.get(`${API_BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  },
  getPendingDoctors: async () => {
    const response = await axios.get(`${API_BASE_URL}/doctors/pending`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  },
  approveDoctor: async (id) => {
    const response = await axios.post(
      `${API_BASE_URL}/doctors/approve/${id}`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    return response.data;
  },
  rejectDoctor: async (id) => {
    const response = await axios.post(
      `${API_BASE_URL}/doctors/reject/${id}`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    return response.data;
  },
  deleteUser: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/users/delete/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  },
  getApprovedDoctors: async () => {
    const response = await axios.get(`${API_BASE_URL}/doctors`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  },
  createAppointment: async (doctorId, timeSlot) => {
    const response = await axios.post(
      `${API_BASE_URL}/appointments`,
      { doctorId, timeSlot },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    return response.data;
  },
  getAvailableTimeSlots: async (doctorId) => {
    const response = await axios.get(`${API_BASE_URL}/appointments/available/${doctorId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  },
  getAppointmentsForDoctor: async () => {
    const response = await axios.get(`${API_BASE_URL}/appointments`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  },
  getPatientVisitCount: async () => {
    const response = await axios.get(`${API_BASE_URL}/appointments/visit-count`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  },
  getPatientTimeline: async () => {
    const response = await axios.get(`${API_BASE_URL}/appointments/timeline`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  },
  getPatientHistoryForDoctor: async (patientId) => {
    const response = await axios.get(`${API_BASE_URL}/appointments/patient-history/${patientId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  },
  completeAppointment: async (appointmentId) => {
    const response = await axios.post(
      `${API_BASE_URL}/appointments/complete/${appointmentId}`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    return response.data;
  },
  getPatientVisitCount: async () => {
  const response = await axios.get(`${API_BASE_URL}/appointments/visit-count`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
},
getPatientTimeline: async () => {
  const response = await axios.get(`${API_BASE_URL}/appointments/timeline`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
},
};