// Import React and necessary hooks
import React, { createContext, useState, useEffect } from 'react';
// Import axios for HTTP requests
import axios from 'axios';
// Import API configuration
import API_BASE_URL from '../config';

// Create authentication context
const AuthContext = createContext();

function decodeToken(token) {
  try {
    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
}

// AuthProvider component - provides authentication state and functions to child components
export const AuthProvider = ({ children }) => {
  // State for JWT token, initialized from localStorage
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  // State for current user data, restore from token payload if available
  const [user, setUser] = useState(() => {
    const savedToken = localStorage.getItem('token');
    const decoded = savedToken ? decodeToken(savedToken) : null;
    return decoded ? { id: decoded.id, email: decoded.email, isAdmin: decoded.isAdmin } : null;
  });

  // useEffect to set axios default headers when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]); // Run when token changes

  // Login function - authenticates user and stores token
  const login = async (email, password) => {
    try {
      // POST request to login endpoint
      const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      console.log('Login successful:', res.data);
      // Store token in state
      setToken(res.data.token);
      // Store token in localStorage for persistence
      localStorage.setItem('token', res.data.token);
      // Set axios default authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      // Store user data in state
      setUser(res.data.user); // Assuming user data is returned from API
    } catch (err) {
      // Log error for debugging
      console.error('Login error:', err.response?.data || err.message);
      // Re-throw error to be handled by component
      throw err;
    }
  };

  // Register function - creates new user account and logs them in
  const register = async (username, email, password) => {
    try {
      // POST request to register endpoint
      const res = await axios.post(`${API_BASE_URL}/auth/register`, { name: username, email, password });
      console.log('Registration successful:', res.data);
      // Store token in state
      setToken(res.data.token);
      // Store token in localStorage
      localStorage.setItem('token', res.data.token);
      // Set axios default authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      // Store user data in state
      setUser(res.data.user);
    } catch (err) {
      // Log error for debugging
      console.error('Registration error:', err.response?.data || err.message);
      // Re-throw error to be handled by component
      throw err;
    }
  };

  // Logout function - clears authentication data
  const logout = () => {
    // Clear user state
    setUser(null);
    // Clear token state
    setToken('');
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Remove authorization header from axios defaults
    delete axios.defaults.headers.common['Authorization'];
  };

  // Provide authentication context to child components
  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the AuthContext for use in components
export default AuthContext;