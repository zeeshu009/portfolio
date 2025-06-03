import { useState, useEffect } from 'react';
import { api } from '../api';

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPatientHistory, setSelectedPatientHistory] = useState(null);
  const [historyError, setHistoryError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const data = await api.getAppointmentsForDoctor();
        setAppointments(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError(err.response?.data?.error || 'Failed to fetch appointments');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleViewHistory = async (patientId) => {
    setLoading(true);
    try {
      const data = await api.getPatientHistoryForDoctor(patientId);
      setSelectedPatientHistory(data.timeline);
      setHistoryError(null);
    } catch (err) {
      console.error('Error fetching patient history:', err);
      setHistoryError(err.response?.data?.error || 'Failed to load patient history');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (appointmentId) => {
    setLoading(true);
    try {
      await api.completeAppointment(appointmentId);
      const data = await api.getAppointmentsForDoctor();
      setAppointments(data);
      setError(null);
    } catch (err) {
      console.error('Error completing appointment:', err);
      setError(err.response?.data?.error || 'Failed to complete appointment');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedPatientHistory(null);
    setHistoryError(null);
  };

  return (
    <div className="container mx-auto p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <h2 className="text-4xl font-extrabold text-blue-900 mb-8 animate-slide-in-down bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        My Scheduled Appointments
      </h2>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 mb-8 rounded-xl shadow-lg animate-fade-in-left" role="alert">
          <p className="font-medium">{error}</p>
        </div>
      )}
      {loading && (
        <div className="text-center text-blue-700 mb-8 animate-pulse">
          <div className="inline-flex items-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-lg">Loading...</p>
          </div>
        </div>
      )}
      {appointments.length === 0 && !loading ? (
        <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100 animate-fade-in-up">
          <p className="text-gray-600 text-lg font-medium">No appointments scheduled.</p>
        </div>
      ) : (
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900 uppercase tracking-wider">Patient Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900 uppercase tracking-wider">Patient Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900 uppercase tracking-wider">Time Slot</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-blue-50 transition-all duration-300 transform hover:scale-[1.01]">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">
                    {appointment.Patient?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {appointment.Patient?.email || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {appointment.timeSlot}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {appointment.status || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {appointment.status === 'approved' && (
                      <button
                        onClick={() => handleComplete(appointment.id)}
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-md mr-3 disabled:opacity-50"
                        disabled={loading}
                      >
                        Complete
                      </button>
                    )}
                    <button
                      onClick={() => handleViewHistory(appointment.Patient.id)}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-md disabled:opacity-50"
                      disabled={loading}
                    >
                      View History
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedPatientHistory && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-500"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-100 transform transition-all duration-500 scale-100 animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-blue-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Patient Visit History
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
            ) : selectedPatientHistory.length === 0 ? (
              <p className="text-gray-600 text-lg font-medium">No visits recorded with this doctor.</p>
            ) : (
              <div className="divide-y divide-gray-200">
                {selectedPatientHistory.map((visit, index) => (
                  <div key={index} className="py-4 hover:bg-blue-50 transition-all duration-300 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-blue-800">Date:</span> {new Date(visit.visitDate).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-blue-800">Time Slot:</span> {visit.timeSlot}
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
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={closeModal}
              className="mt-6 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-md disabled:opacity-50"
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

export default DoctorDashboard;