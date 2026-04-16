// Import React hooks
import { useState, useEffect } from 'react';
// Import Link component for navigation
import { Link } from 'react-router-dom';
// Import axios for HTTP requests
import axios from 'axios';
// Import API configuration
import API_BASE_URL from '../config';
// Import stylesheet
import '../styles.css';

// Posts component - displays a list of all cultural posts with search and filter
const Posts = () => {
  // State to store the list of posts
  const [posts, setPosts] = useState([]);
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  // State for category filter
  const [selectedCategory, setSelectedCategory] = useState('');
  // State for loading indicator
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch posts when component mounts or filters change
  useEffect(() => {
    // Function to fetch posts from the API
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Make GET request to fetch all posts
        const res = await axios.get(`${API_BASE_URL}/posts`);
        // Filter posts based on search query and category
        let filtered = res.data;
        
        if (searchQuery) {
          filtered = filtered.filter(post =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        if (selectedCategory) {
          filtered = filtered.filter(post => post.category === selectedCategory);
        }
        
        // Update state with fetched and filtered posts
        setPosts(filtered);
      } catch (err) {
        // Log any errors to console
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    // Call the fetch function
    fetchPosts();
  }, [searchQuery, selectedCategory]); // Re-run when search or filter changes

  // Get unique categories from posts
  const categories = ['Food', 'Music', 'Art', 'Tradition', 'Festival', 'Language', 'Other'];

  return (
    // Container for the posts page
    <div className="posts-container">
      {/* Page title */}
      <h2>Cultural Posts</h2>
      
      {/* Search and filter section */}
      <div className="search-filter">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        
        {/* Category filter dropdown */}
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-filter"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Loading indicator */}
      {loading && <p className="loading">Loading posts...</p>}

      {/* Posts list */}
      {!loading && posts.length > 0 ? (
        <div className="posts-grid">
          {/* Map over posts array to render each post */}
          {posts.map(post => (
            // Individual post card with unique key
            <div key={post.id} className="post-card">
              {/* Display image if available */}
              {post.imageUrl && (
                <div className="post-image">
                  <img src={post.imageUrl} alt={post.title} />
                </div>
              )}
              
              <div className="post-content">
                {/* Post title */}
                <h3>{post.title}</h3>
                
                {/* Post category badge */}
                <span className="category-badge">{post.category}</span>
                
                {/* Post country if available */}
                {post.country && <p className="country">{post.country}</p>}
                
                {/* Post content preview (first 100 characters) */}
                <p className="post-preview">{post.content.substring(0, 100)}...</p>
                
                {/* Author info */}
                <small className="post-author">by {post.user?.name || 'Anonymous'}</small>
                
                {/* Link to view full post details */}
                <Link to={`/posts/${post.id}`} className="read-more-btn">Read More</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="no-posts">No posts found. Be the first to share!</p>
      )}
    </div>
  );
};

// Export the Posts component
export default Posts;