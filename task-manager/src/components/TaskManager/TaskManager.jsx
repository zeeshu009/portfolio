import React, { useState } from 'react';
import './TaskManager.css';

function TaskManager() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Walk dog' },
    { id: 2, text: 'Write code' },
    { id: 3, text: 'Read docs' },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return; 
    const task = {
      id: tasks.length + 1,
      text: newTask.trim(),
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

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
          <li key={task.id} className="task-item">
            <span>{task.text}</span>
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;