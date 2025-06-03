import { useState, useEffect } from 'react';
import { api } from '../api';

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await api.getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.error || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setLoading(true);
      try {
        await api.deleteUser(id);
        await fetchUsers(); // Refresh the user list
        setError(null);
      } catch (err) {
        console.error('Error deleting user:', err);
        setError(err.response?.data?.error || 'Failed to delete user');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <h2 className="text-4xl font-extrabold text-blue-900 mb-8 animate-slide-in-down bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        Users
      </h2>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 mb-8 rounded-xl shadow-md animate-fade-in-left" role="alert">
          <p className="font-medium">{error}</p>
        </div>
      )}
      {loading ? (
        <div className="text-center text-blue-700 mb-8 animate-pulse flex items-center justify-center space-x-2">
          <svg className="animate-spin h-5 w-5 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-lg font-medium">Loading...</p>
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100 animate-fade-in-up">
          <p className="text-gray-600 text-lg font-medium">No users found.</p>
        </div>
      ) : (
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100 animate-fade-in-up">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-900 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-blue-50 transition-all duration-300 transform hover:scale-[1.01]">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">{user.name || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-md disabled:opacity-50"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserList;