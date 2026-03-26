// Import Link component from React Router for navigation
import { Link } from 'react-router-dom';
// Import the main stylesheet
import '../styles.css';

// Home component - the landing page of the application
const Home = () => {
  return (
    // Main container for the home page with CSS class for styling
    <div className="home">
      {/* Hero section with main title and call-to-action */}
      <header className="hero">
        {/* Main heading of the application */}
        <h1>CULTURECONNECT</h1>
        {/* Subtitle describing the app's purpose */}
        <p>CONNECTING CULTURES, SHARING STORIES</p>
        {/* Description paragraph */}
        <p>Your platform to explore and share cultural experiences from around the world.</p>
        {/* Buttons for navigation to key features */}
        <div className="hero-buttons">
          {/* Link to posts page with primary button styling */}
          <Link to="/posts" className="btn primary">Explore Posts</Link>
          {/* Link to registration page with secondary button styling */}
          <Link to="/register" className="btn secondary">Join Now</Link>
        </div>
      </header>
      {/* Features section explaining the app's benefits */}
      <section className="features">
        {/* Section heading */}
        <h2>Why CultureConnect?</h2>
        {/* Grid container for feature cards */}
        <div className="feature-grid">
          {/* First feature card */}
          <div className="feature">
            <h3>Share Stories</h3>
            <p>Post about your cultural experiences, traditions, and discoveries.</p>
          </div>
          {/* Second feature card */}
          <div className="feature">
            <h3>Connect Globally</h3>
            <p>Interact with people from different cultures through comments and discussions.</p>
          </div>
          {/* Third feature card */}
          <div className="feature">
            <h3>Discover New Cultures</h3>
            <p>Learn about diverse traditions, foods, arts, and more.</p>
          </div>
        </div>
      </section>
      {/* Footer with copyright information */}
      <footer className="footer">
        <p>&copy; 2026 CultureConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Export the Home component as the default export
export default Home;