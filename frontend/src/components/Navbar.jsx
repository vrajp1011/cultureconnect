// Import Link and useLocation from React Router
import { Link, useLocation } from 'react-router-dom';
// Import React hooks
import { useContext, useState, useEffect } from 'react';
// Import authentication context
import AuthContext from '../context/AuthContext';
// Import stylesheet
import '../styles.css';

// Navbar component - navigation bar with links and user authentication controls
const Navbar = () => {
  // Get user and logout function from authentication context
  const { user, logout } = useContext(AuthContext);
  // State to track if page has been scrolled
  const [scrolled, setScrolled] = useState(false);
  // Get current location for active link highlighting
  const location = useLocation();

  // useEffect to handle scroll event for navbar styling
  useEffect(() => {
    // Function to check scroll position
    const handleScroll = () => {
      // Set scrolled state if scrolled more than 50px
      setScrolled(window.scrollY > 50);
    };
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Cleanup function to remove event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array

  return (
    // Navigation element with conditional scrolled class
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Brand/logo section */}
      <div className="navbar-brand">
        {/* Link to home page */}
        <Link to="/">CultureConnect</Link>
      </div>
      {/* Navigation links */}
      <ul className="navbar-links">
        {/* Posts link with active class if current page */}
        <li><Link to="/posts" className={location.pathname === '/posts' ? 'active' : ''}>Posts</Link></li>
        {/* Conditional rendering based on authentication status */}
        {user ? (
          // Links for authenticated users
          <>
            {/* Create post link */}
            <li><Link to="/create-post" className={location.pathname === '/create-post' ? 'active' : ''}>Create Post</Link></li>
            {/* Logout button */}
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          // Links for unauthenticated users
          <>
            {/* Login link */}
            <li><Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link></li>
            {/* Register link */}
            <li><Link to="/register" className={location.pathname === '/register' ? 'active' : ''}>Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

// Export the Navbar component
export default Navbar;