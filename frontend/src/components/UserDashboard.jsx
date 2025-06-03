import { useState, useEffect } from 'react';
import { api } from '../api';

function UserDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visitHistory, setVisitHistory] = useState(null);
  const [visitCount, setVisitCount] = useState(0);
  const [historyError, setHistoryError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const data = await api.getApprovedDoctors();
        setDoctors(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError(err.response?.data?.error || 'Failed to fetch doctors');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleDoctorChange = async (e) => {
    const doctorId = e.target.value;
    setSelectedDoctor(doctorId);
    setSelectedTimeSlot('');
    setTimeSlots([]);
    if (doctorId) {
      setLoading(true);
      try {
        const data = await api.getAvailableTimeSlots(doctorId);
        setTimeSlots(data.availableTimeSlots || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching time slots:', err);
        setError(err.response?.data?.error || 'Failed to fetch time slots');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTimeSlotChange = (e) => {
    setSelectedTimeSlot(e.target.value);
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedTimeSlot) {
      setError('Please select a doctor and time slot');
      return;
    }
    setLoading(true);
    try {
      await api.createAppointment(selectedDoctor, selectedTimeSlot);
      setSuccess('Appointment booked successfully!');
      setError(null);
      setSelectedDoctor('');
      setSelectedTimeSlot('');
      setTimeSlots([]);
    } catch (err) {
      console.error('Error booking appointment:', err);
      setError(err.response?.data?.error || 'Failed to book appointment');
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  const handleViewHistory = async () => {
    setLoading(true);
    try {
      const timelineData = await api.getPatientTimeline();
      const visitCountData = await api.getPatientVisitCount();
      setVisitHistory(timelineData.timeline);
      setVisitCount(visitCountData.visitCount);
      setHistoryError(null);
    } catch (err) {
      console.error('Error fetching medical history:', err);
      setHistoryError(err.response?.data?.error || 'Failed to load medical history');
      setVisitHistory(null);
      setVisitCount(0);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setVisitHistory(null);
    setHistoryError(null);
    setVisitCount(0);
  };

  return (
    <div className="container mx-auto p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <h2 className="text-4xl font-extrabold text-blue-900 mb-8 animate-slide-in-down bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        Patient Dashboard
      </h2>

      {/* Appointment Booking Form */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 mb-8 border border-gray-100 animate-fade-in-up">
        <h3 className="text-2xl font-bold text-blue-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Book an Appointment
        </h3>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 mb-6 rounded-xl shadow-md animate-fade-in-left" role="alert">
            <p className="font-medium">{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-4 mb-6 rounded-xl shadow-md animate-fade-in-left" role="alert">
            <p className="font-medium">{success}</p>
          </div>
        )}
        {loading && (
          <div className="text-center text-blue-700 mb-6 animate-pulse flex items-center justify-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg font-medium">Loading...</p>
          </div>
        )}
        <form onSubmit={handleBookAppointment}>
          <div className="mb-6">
            <label htmlFor="doctor" className="block text-sm font-semibold text-gray-700 mb-2">
              Select Doctor
            </label>
            <select
              id="doctor"
              value={selectedDoctor}
              onChange={handleDoctorChange}
              className="mt-1 block w-full border-gray-200 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-50 text-gray-800 sm:text-sm transition-all duration-300"
              disabled={loading}
            >
              <option value="">Select a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} ({doctor.specialization})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="timeSlot" className="block text-sm font-semibold text-gray-700 mb-2">
              Select Time Slot
            </label>
            <select
              id="timeSlot"
              value={selectedTimeSlot}
              onChange={handleTimeSlotChange}
              className="mt-1 block w-full border-gray-200 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-50 text-gray-800 sm:text-sm transition-all duration-300"
              disabled={loading || !selectedDoctor}
            >
              <option value="">Select a time slot</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-md disabled:opacity-50"
              disabled={loading}
            >
              Book Appointment
            </button>
            <button
              onClick={handleViewHistory}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-md disabled:opacity-50"
              disabled={loading}
            >
              View Medical History
            </button>
          </div>
        </form>
      </div>

      {/* Medical History Modal */}
      {visitHistory && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-500"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-100 transform transition-all duration-500 scale-100 animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-blue-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Medical History
            </h3>
            {historyError && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 mb-6 rounded-xl shadow-md" role="alert">
                <p className="font-medium">{historyError}</p>
              </div>
            )}
            {loading ? (
              <div className="text-gray-600 text-lg animate-pulse flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p>Loading history...</p>
              </div>
            ) : (
              <>
                <p className="text-lg font-semibold text-gray-700 mb-6 bg-gray-50 p-3 rounded-lg">
                  Total Visits: {visitCount}
                </p>
                {visitHistory.length === 0 ? (
                  <p className="text-gray-600 text-lg font-medium">No visits recorded.</p>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {visitHistory.map((visit, index) => (
                      <div key={index} className="py-4 hover:bg-blue-50 transition-all duration-300 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold text-blue-800">Date:</span> {new Date(visit.visitDate).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold text-blue-800">Doctor:</span> {visit.doctorName}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold text-blue-800">Doctor Email:</span> {visit.doctorEmail}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold text-blue-800">Specialization:</span> {visit.specialization}
                        </p>
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold text-blue-800">Time Slot:</span> {visit.timeSlot}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            <button
              onClick={closeModal}
              className="mt-6 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-lg hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-md disabled:opacity-50"
              disabled={loading}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;