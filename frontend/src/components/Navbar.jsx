import { Link, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import '../styles.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-brand">
        <Link to="/">CultureConnect</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/posts" className={location.pathname === '/posts' ? 'active' : ''}>Posts</Link></li>
        {user ? (
          <>
            <li><Link to="/create-post" className={location.pathname === '/create-post' ? 'active' : ''}>Create Post</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link></li>
            <li><Link to="/register" className={location.pathname === '/register' ? 'active' : ''}>Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;