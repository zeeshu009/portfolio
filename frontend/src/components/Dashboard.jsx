import { useNavigate, Link, Routes, Route } from 'react-router-dom';
import UserList from './UserList';
import PendingDoctors from './PendingDoctors';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/login');
    } catch (err) {
      console.error('Error during logout:', err);
      alert('Failed to logout. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="dashboard bg-white shadow-2xl rounded-2xl p-8 border border-gray-100 animate-fade-in-up">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-extrabold text-blue-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 animate-slide-in-down">
            Admin Dashboard
          </h1>
          <button
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <nav className="nav flex space-x-4 mb-8 border-b border-gray-200 pb-2 animate-fade-in-left">
          <Link
            to="/dashboard/users"
            className="text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-900 transition-all duration-300 transform hover:scale-105"
          >
            Users
          </Link>
          <Link
            to="/dashboard/pending-doctors"
            className="text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-900 transition-all duration-300 transform hover:scale-105"
          >
            Pending Doctors
          </Link>
        </nav>
        <div className="content">
          <Routes>
            <Route path="users" element={<UserList />} />
            <Route path="pending-doctors" element={<PendingDoctors />} />
            <Route path="/" element={<UserList />} /> {/* Default route for /dashboard */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;