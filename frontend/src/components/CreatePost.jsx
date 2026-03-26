// Import React hooks and context
import { useState, useContext } from 'react';
// Import navigation hook from React Router
import { useNavigate } from 'react-router-dom';
// Import axios for HTTP requests
import axios from 'axios';
// Import authentication context
import AuthContext from '../context/AuthContext';
// Import stylesheet
import '../styles.css';

// CreatePost component - allows users to create new cultural posts
const CreatePost = () => {
  // State for post title
  const [title, setTitle] = useState('');
  // State for post category
  const [category, setCategory] = useState('');
  // State for post content
  const [content, setContent] = useState('');
  // Get current user from authentication context
  const { user } = useContext(AuthContext);
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    // Prevent default form submission
    e.preventDefault();
    // Check if user is logged in
    if (!user) {
      alert('Please login first');
      return;
    }
    try {
      // POST request to create new post
      await axios.post('http://localhost:5004/api/posts', { title, category, content });
      // Navigate to posts page after successful creation
      navigate('/posts');
    } catch (err) {
      // Show error alert if creation fails
      alert('Failed to create post');
    }
  };

  return (
    // Container for the create post page
    <div className="create-post-container">
      {/* Form for creating new posts */}
      <form onSubmit={handleSubmit} className="create-post-form">
        {/* Form title */}
        <h2>Create Post</h2>
        {/* Title input field */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {/* Category input field */}
        <input
          type="text"
          placeholder="Category (e.g., Food, Music, Art, Tradition)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        {/* Content textarea */}
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        {/* Submit button */}
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

// Export the CreatePost component
export default CreatePost;