// Import React hooks and context
import { useState, useEffect, useContext } from 'react';
// Import useParams hook to get URL parameters
import { useParams } from 'react-router-dom';
// Import axios for HTTP requests
import axios from 'axios';
// Import authentication context
import AuthContext from '../context/AuthContext';
// Import API configuration
import API_BASE_URL from '../config';
// Import stylesheet
import '../styles.css';

// PostDetail component - displays individual post with comments
const PostDetail = () => {
  // Get the post ID from URL parameters
  const { id } = useParams();
  // State for the post data
  const [post, setPost] = useState(null);
  // State for comments on this post
  const [comments, setComments] = useState([]);
  // State for new comment input
  const [newComment, setNewComment] = useState('');
  // Get current user from authentication context
  const { user } = useContext(AuthContext);

  // useEffect to fetch post and comments when component mounts or ID changes
  useEffect(() => {
    // Function to fetch the specific post
    const fetchPost = async () => {
      try {
        // GET request to fetch post by ID
        const res = await axios.get(`${API_BASE_URL}/posts/${id}`);
        // Update post state
        setPost(res.data);
      } catch (err) {
        // Log errors
        console.error(err);
      }
    };

    // Function to fetch comments for this post
    const fetchComments = async () => {
      try {
        // GET request to fetch comments for this post
        const res = await axios.get(`${API_BASE_URL}/posts/${id}/comments`);
        // Update comments state
        setComments(res.data);
      } catch (err) {
        // Log errors
        console.error(err);
      }
    };

    // Call both fetch functions
    fetchPost();
    fetchComments();
  }, [id]); // Re-run when post ID changes

  // Handle submitting a new comment
  const handleCommentSubmit = async (e) => {
    // Prevent form default submission
    e.preventDefault();
    try {
      // POST request to add new comment
      await axios.post(`${API_BASE_URL}/posts/${id}/comments`, { content: newComment });
      // Clear the input field
      setNewComment('');
      // Refresh comments list
      const res = await axios.get(`${API_BASE_URL}/posts/${id}/comments`);
      setComments(res.data);
    } catch (err) {
      // Show error alert
      alert('Failed to add comment');
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (commentId) => {
    try {
      // DELETE request to remove comment
      await axios.delete(`${API_BASE_URL}/comments/${commentId}`);
      // Update local state by filtering out deleted comment
      setComments(comments.filter(c => c.id !== commentId));
    } catch (err) {
      // Show error alert
      alert('Failed to delete comment');
    }
  };

  // Show loading message while post is being fetched
  if (!post) return <div>Loading...</div>;

  return (
    // Container for post detail page
    <div className="post-detail">
      {/* Post image if available */}
      {post.imageUrl && (
        <div className="post-detail-image">
          <img src={post.imageUrl} alt={post.title} />
        </div>
      )}
      
      {/* Post title */}
      <h2>{post.title}</h2>
      
      {/* Post metadata */}
      <div className="post-metadata">
        <span className="category-badge">{post.category}</span>
        {post.country && <span className="country-info">{post.country}</span>}
        <span className="post-author">by {post.user?.name || 'Anonymous'}</span>
      </div>
      
      {/* Post content */}
      <p className="post-body">{post.content}</p>
      
      {/* Comments section header */}
      <h3>Comments ({comments.length})</h3>
      {/* Map over comments to display each one */}
      {comments.length > 0 ? (
        <div className="comments-section">
          {comments.map(comment => (
            // Individual comment container
            <div key={comment.id} className="comment">
              {/* Comment author */}
              <p className="comment-author">{comment.user?.name || 'Anonymous'}:</p>
              {/* Comment content */}
              <p className="comment-text">{comment.content}</p>
              {/* Show delete button only if current user owns the comment */}
              {user && user.id === comment.userId && (
                <button onClick={() => handleDeleteComment(comment.id)} className="btn-delete">Delete</button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="no-comments">No comments yet. Be the first to comment!</p>
      )}
      {/* Show comment form only if user is logged in */}
      {user && (
        // Form for adding new comments
        <form onSubmit={handleCommentSubmit} className="comment-form">
          {/* Textarea for comment input */}
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            required
            rows="4"
          />
          {/* Submit button */}
          <button type="submit" className="btn-primary">Post Comment</button>
        </form>
      )}
      {!user && <p className="login-prompt">Please <a href="/login">login</a> to comment.</p>}
    </div>
  );
};

// Export the PostDetail component
export default PostDetail;