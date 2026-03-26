// Import React hooks and context
import { useState, useContext } from 'react';
// Import navigation hook from React Router
import { useNavigate } from 'react-router-dom';
// Import authentication context
import AuthContext from '../context/AuthContext';
// Import stylesheet
import '../styles.css';

// Login component - handles user authentication
const Login = () => {
  // State variables for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Get login function from authentication context
  const { login } = useContext(AuthContext);
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();
    try {
      // Attempt to login with provided credentials
      await login(email, password);
      // Navigate to posts page on successful login
      navigate('/posts');
    } catch (err) {
      // Show error message if login fails
      alert('Login failed');
    }
  };

  return (
    // Container for the login page
    <div className="auth-container">
      {/* Login form */}
      <form onSubmit={handleSubmit} className="auth-form">
        {/* Form title */}
        <h2>Login</h2>
        {/* Email input field */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* Password input field */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* Submit button */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

// Export the Login component
export default Login;