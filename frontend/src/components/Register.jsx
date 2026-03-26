// Import React hooks and context
import { useState, useContext } from 'react';
// Import navigation hook from React Router
import { useNavigate } from 'react-router-dom';
// Import authentication context
import AuthContext from '../context/AuthContext';
// Import stylesheet
import '../styles.css';

// Register component - handles user registration
const Register = () => {
  // State variables for form inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Get register function from authentication context
  const { register } = useContext(AuthContext);
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();
    try {
      // Attempt to register with provided credentials
      await register(username, email, password);
      // Navigate to posts page on successful registration
      navigate('/posts');
    } catch (err) {
      // Show error message if registration fails
      alert('Registration failed');
    }
  };

  return (
    // Container for the registration page
    <div className="auth-container">
      {/* Registration form */}
      <form onSubmit={handleSubmit} className="auth-form">
        {/* Form title */}
        <h2>Register</h2>
        {/* Username input field */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

// Export the Register component
export default Register;