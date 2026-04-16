// Import React hooks and context
import { useState, useContext } from 'react';
// Import navigation hook from React Router
import { useNavigate, Link } from 'react-router-dom';
// Import authentication context
import AuthContext from '../context/AuthContext';
// Import stylesheet
import '../styles.css';

// Login component - handles user authentication
const Login = () => {
  // State variables for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State for error messages
  const [error, setError] = useState('');
  // State for loading
  const [loading, setLoading] = useState(false);
  // Get login function from authentication context
  const { login } = useContext(AuthContext);
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Attempt to login with provided credentials
      await login(email, password);
      // Navigate to posts page on successful login
      navigate('/posts');
    } catch (err) {
      // Show detailed error message if login fails
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Container for the login page
    <div className="auth-container">
      {/* Login form */}
      <form onSubmit={handleSubmit} className="auth-form">
        {/* Form title */}
        <h2>Login</h2>
        
        {/* Error message display */}
        {error && <div className="error-message">{error}</div>}
        
        {/* Email input field */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        {/* Password input field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        {/* Submit button */}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* Link to register page */}
        <p className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

// Export the Login component
export default Login;