import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import ErrorPage from './ErrorPage';

function Home({ token, isAuthenticated }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!token || !isAuthenticated) return; // Prevent fetch if not authenticated
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch tasks');
        if (err.response?.status === 404) {
          setError('Access denied. Please log in.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [token, isAuthenticated]);

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim() || !token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/tasks',
        { text: newTask.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  const removeTask = async (id) => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id) => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((task) =>
        task.id === id ? response.data : task
      ));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <ErrorPage />;
  }

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return (
    <div className="error-container">
      <div className="error">{error}</div>
      <button onClick={() => setError(null)}>Retry</button>
    </div>
  );

  return (
    <div className="task-manager">
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>Add Task</button>
      </form>
      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? 'completed' : ''}`}
          >
            <span>{task.text}</span>
            <div className="task-buttons">
              <button
                onClick={() => toggleComplete(task.id)}
                className="complete-btn"
                disabled={loading}
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => removeTask(task.id)}
                disabled={loading}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;