import { Link } from 'react-router-dom';
import './About.css';

function About() {
  return (
    <div className="about">
      <h1>About Task Manager</h1>
      <p>
        This Task Manager app is built as part of the Week 2 assignment for the <strong>Focus on Skill</strong> boot camp. It allows users to manage their tasks by adding, removing, and marking them as complete.
      </p>
      <p>
        The app uses React for the frontend, fetching tasks from the JSONPlaceholder API, and includes features like React Router for navigation, responsive design, and error handling.
      </p>
      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
}

export default About;