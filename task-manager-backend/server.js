const express = require('express');
  const cors = require('cors');
  const jwt = require('jsonwebtoken');
  const pool = require('./db');
  require('dotenv').config();

  const app = express();
  const port = process.env.PORT || 5000;
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in .env');
  }

  // Middleware
  app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE'],
  }));
  app.use(express.json());

  // JWT Authentication Middleware
  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Access denied, token missing' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).json({ error: 'Invalid token' });
    }
  };

  // Login endpoint to generate a token (for testing)
  app.post('/api/login', (req, res) => {
    const user = { id: 1, username: 'testuser' };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });

  // API Endpoints (protected with JWT)
  app.get('/api/tasks', authenticateToken, async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  });

  app.post('/api/tasks', authenticateToken, async (req, res) => {
    try {
      const { text } = req.body;
      if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Task text is required' });
      }
      const result = await pool.query(
        'INSERT INTO tasks (text) VALUES ($1) RETURNING *',
        [text.trim()]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add task' });
    }
  });

  app.delete('/api/tasks/:id', authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete task' });
    }
  });

  // Error Handling Middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });