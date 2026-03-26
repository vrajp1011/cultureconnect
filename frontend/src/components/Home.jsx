import { Link } from 'react-router-dom';
import '../styles.css';

const Home = () => {
  return (
    <div className="home">
      <header className="hero">
        <h1>CULTURECONNECT</h1>
        <p>CONNECTING CULTURES, SHARING STORIES</p>
        <p>Your platform to explore and share cultural experiences from around the world.</p>
        <div className="hero-buttons">
          <Link to="/posts" className="btn primary">Explore Posts</Link>
          <Link to="/register" className="btn secondary">Join Now</Link>
        </div>
      </header>
      <section className="features">
        <h2>Why CultureConnect?</h2>
        <div className="feature-grid">
          <div className="feature">
            <h3>Share Stories</h3>
            <p>Post about your cultural experiences, traditions, and discoveries.</p>
          </div>
          <div className="feature">
            <h3>Connect Globally</h3>
            <p>Interact with people from different cultures through comments and discussions.</p>
          </div>
          <div className="feature">
            <h3>Discover New Cultures</h3>
            <p>Learn about diverse traditions, foods, arts, and more.</p>
          </div>
        </div>
      </section>
      <footer className="footer">
        <p>&copy; 2026 CultureConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;