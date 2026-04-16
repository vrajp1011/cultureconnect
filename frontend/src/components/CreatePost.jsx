// Import React hooks and context
import { useState, useContext } from 'react';
// Import navigation hook from React Router
import { useNavigate } from 'react-router-dom';
// Import axios for HTTP requests
import axios from 'axios';
// Import authentication context
import AuthContext from '../context/AuthContext';
// Import API configuration
import API_BASE_URL from '../config';
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
  // State for image preview
  const [imagePreview, setImagePreview] = useState(null);
  // State for image file
  const [imageData, setImageData] = useState('');
  // State for country/origin
  const [country, setCountry] = useState('');
  // Get current user from authentication context
  const { user } = useContext(AuthContext);
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
      // POST request to create new post with image
      await axios.post(`${API_BASE_URL}/posts`, { 
        title, 
        category, 
        content,
        country,
        imageUrl: imageData
      });
      // Navigate to posts page after successful creation
      navigate('/posts');
    } catch (err) {
      // Show error alert if creation fails
      alert('Failed to create post: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    // Container for the create post page
    <div className="create-post-container">
      {/* Form for creating new posts */}
      <form onSubmit={handleSubmit} className="create-post-form">
        {/* Form title */}
        <h2>Create Cultural Post</h2>
        
        {/* Title input field */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        {/* Category input field */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select 
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Music">Music</option>
            <option value="Art">Art</option>
            <option value="Tradition">Tradition</option>
            <option value="Festival">Festival</option>
            <option value="Language">Language</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Country/Origin field */}
        <div className="form-group">
          <label htmlFor="country">Country/Origin</label>
          <input
            id="country"
            type="text"
            placeholder="Country or region of origin"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        {/* Image upload field */}
        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              <p>Image preview</p>
            </div>
          )}
        </div>
        
        {/* Content textarea */}
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            placeholder="Share detailed information about this cultural element..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="8"
          />
        </div>
        
        {/* Submit button */}
        <button type="submit" className="btn-primary">Create Post</button>
      </form>
    </div>
  );
};

// Export the CreatePost component
export default CreatePost;