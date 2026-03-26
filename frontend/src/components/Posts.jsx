// Import React hooks
import { useState, useEffect } from 'react';
// Import Link component for navigation
import { Link } from 'react-router-dom';
// Import axios for HTTP requests
import axios from 'axios';
// Import stylesheet
import '../styles.css';

// Posts component - displays a list of all cultural posts
const Posts = () => {
  // State to store the list of posts
  const [posts, setPosts] = useState([]);

  // useEffect hook to fetch posts when component mounts
  useEffect(() => {
    // Function to fetch posts from the API
    const fetchPosts = async () => {
      try {
        // Make GET request to fetch all posts
        const res = await axios.get('http://localhost:5000/api/posts');
        // Update state with fetched posts
        setPosts(res.data);
      } catch (err) {
        // Log any errors to console
        console.error(err);
      }
    };
    // Call the fetch function
    fetchPosts();
  }, []); // Empty dependency array means this runs only once on mount

  return (
    // Container for the posts page
    <div className="posts-container">
      {/* Page title */}
      <h2>Posts</h2>
      {/* Map over posts array to render each post */}
      {posts.map(post => (
        // Individual post card with unique key
        <div key={post.id} className="post-card">
          {/* Post title */}
          <h3>{post.title}</h3>
          {/* Post content preview (first 100 characters) */}
          <p>{post.content.substring(0, 100)}...</p>
          {/* Link to view full post details */}
          <Link to={`/posts/${post.id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
};

// Export the Posts component
export default Posts;