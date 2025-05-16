import { Link } from 'react-router-dom';
import './About.css';

function About() {
  return (
    <div className="about">
      <h1>About Task Manager</h1>
      <p>
        This is the React frontend for the Task Manager application, built as part of the Week 2 assignment (Monday-Friday). It integrates with a custom Express/PostgreSQL backend for task management.
      </p>
      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
}

export default About;