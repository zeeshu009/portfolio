import { useState, useEffect } from 'react';
import { api } from '../api';

function PatientHistory() {
  const [visitCount, setVisitCount] = useState(0);
  const [timeline, setTimeline] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisitData = async () => {
      try {
        const countData = await api.getPatientVisitCount();
        const timelineData = await api.getPatientTimeline();
        setVisitCount(countData.visitCount);
        setTimeline(timelineData.timeline);
        setError(null);
      } catch (err) {
        console.error('Error fetching visit data:', err);
        setError(err.response?.data?.error || 'Failed to load visit history');
      }
    };
    fetchVisitData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Medical History</h2>
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Total Checkups</h3>
        <p className="text-gray-600">You have had <span className="font-bold">{visitCount}</span> checkup(s).</p>
      </div>
      <div className="bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 p-6">Visit Timeline</h3>
        {timeline.length === 0 ? (
          <p className="text-gray-600 p-6">No visits recorded.</p>
        ) : (
          <div className="divide-y divide-gray-200">
            {timeline.map((visit, index) => (
              <div key={index} className="p-6 hover:bg-gray-50">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Date:</span> {new Date(visit.visitDate).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Time Slot:</span> {visit.timeSlot}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Doctor:</span> {visit.doctorName}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Doctor Email:</span> {visit.doctorEmail}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Specialization:</span> {visit.specialization}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientHistory;