// Import React hooks and context
import { useState, useEffect, useContext } from 'react';
// Import useParams hook to get URL parameters
import { useParams } from 'react-router-dom';
// Import axios for HTTP requests
import axios from 'axios';
// Import authentication context
import AuthContext from '../context/AuthContext';
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
        const res = await axios.get(`http://localhost:5004/api/posts/${id}`);
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
        const res = await axios.get(`http://localhost:5004/api/posts/${id}/comments`);
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
      await axios.post(`http://localhost:5004/api/posts/${id}/comments`, { content: newComment });
      // Clear the input field
      setNewComment('');
      // Refresh comments list
      const res = await axios.get(`http://localhost:5004/api/posts/${id}/comments`);
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
      await axios.delete(`http://localhost:5004/api/comments/${commentId}`);
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
      {/* Post title */}
      <h2>{post.title}</h2>
      {/* Post content */}
      <p>{post.content}</p>
      {/* Comments section header */}
      <h3>Comments</h3>
      {/* Map over comments to display each one */}
      {comments.map(comment => (
        // Individual comment container
        <div key={comment.id} className="comment">
          {/* Comment content */}
          <p>{comment.content}</p>
          {/* Show delete button only if current user owns the comment */}
          {user && user.id === comment.userId && (
            <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
          )}
        </div>
      ))}
      {/* Show comment form only if user is logged in */}
      {user && (
        // Form for adding new comments
        <form onSubmit={handleCommentSubmit} className="comment-form">
          {/* Textarea for comment input */}
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            required
          />
          {/* Submit button */}
          <button type="submit">Comment</button>
        </form>
      )}
    </div>
  );
};

// Export the PostDetail component
export default PostDetail;