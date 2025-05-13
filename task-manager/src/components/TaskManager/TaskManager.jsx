import React, { useState, useEffect } from 'react';
import './TaskManager.css';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from JSONPlaceholder on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        // Map API data to match our task structure and limit to 3 tasks
        const fetchedTasks = data.slice(0, 3).map((task) => ({
          id: task.id,
          text: task.title,
          completed: task.completed,
        }));
        setTasks(fetchedTasks);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    const task = {
      id: tasks.length + 1,
      text: newTask.trim(),
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  if (loading) return <div className="loading">Loading tasks...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button type="submit">Add Task</button>
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
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => removeTask(task.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;