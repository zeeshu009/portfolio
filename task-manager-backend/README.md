Task Manager Backend - Week 2 Assignment (Express Server with PostgreSQL)

Overview

This is the backend for the Task Manager application, built as part of the Week 2 assignment (Wednesday-Thursday). Initially set up with Express, JWT authentication, and in-memory storage on Wednesday, it has been enhanced on Thursday to use PostgreSQL for persistent data storage. The API provides endpoints for managing tasks, with data validation, error handling, and CORS support.

Features





PostgreSQL Integration: Tasks are now stored in a PostgreSQL database with the following schema:





Table: tasks



Columns:





id (SERIAL, PRIMARY KEY)



text (VARCHAR, NOT NULL)



completed (BOOLEAN, DEFAULT false)



created_at (TIMESTAMP, DEFAULT NOW())



API Endpoints (protected with JWT authentication):





POST /api/login: Generates a JWT token for authentication.



GET /api/tasks: Retrieves all tasks from the database, ordered by created_at (descending).



POST /api/tasks: Adds a new task to the database.



DELETE /api/tasks/:id: Deletes a task by ID.



Data Validation: Ensures task text is not empty before adding to the database.



Error Handling: Handles database errors, invalid tokens, and missing task data with appropriate status codes and messages.