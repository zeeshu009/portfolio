# Task Manager - Week 2 Assignment (React Frontend)

## Overview
This is the React frontend for the Task Manager application, built as part of the Week 2 assignment (Monday-Friday). It integrates with a custom Express/PostgreSQL backend for task management.

### Features
- Fetches tasks from `http://localhost:5000/api/tasks`.
- Adds new tasks via a form, saving to the database.
- Deletes tasks and toggles completion status, syncing with the backend.
- Secured with JWT authentication.
- Includes loading states and error handling for API operations.

## Setup
1. Ensure the backend (`task-manager-backend`) is running at `http://localhost:5000`.
2. Install dependencies: `npm install`.
3. Start the app: `npm start`.

## Integration
- Connected to the Express backend with PostgreSQL, handling CRUD operations.
- Uses JWT for protected routes.

## Submission
- Frontend GitHub: [https://github.com/yourusername/task-manager]
- Backend GitHub: [https://github.com/yourusername/task-manager-backend]
- Screenshots/Video: Included