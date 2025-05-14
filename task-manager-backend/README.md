Task Manager Backend - Week 2 Assignment (Express Server)

Overview

This is the backend for the Task Manager application, built as part of the Week 2 assignment for the Focus on Skill boot camp (Wednesday: Backend Development with Express). The server provides API endpoints for managing tasks, secured with JWT authentication, and includes CORS for integration with the React frontend. Tasks are stored in memory (no database yet).

Features





API endpoints:





POST /api/login: Generates a JWT token for authentication.



GET /api/tasks: Returns all tasks (protected route).



POST /api/tasks: Adds a new task (accepts { text: "Task description" }).



DELETE /api/tasks/:id: Deletes a task by ID.



JWT authentication middleware for protected routes.



Basic error handling middleware.



CORS middleware to allow requests from the React app (http://localhost:3000).



In-memory task storage.