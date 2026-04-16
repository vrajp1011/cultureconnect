import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import API_BASE_URL from '../config';
import '../styles.css';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/posts`);
        setPosts(res.data);
      } catch (err) {
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (!window.confirm('Delete this post permanently?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  if (!user || !user.isAdmin) {
    return (
      <div className="admin-dashboard">
        <h2>Admin access required</h2>
        <p>You must be logged in as an admin to view this page.</p>
        <Link to="/login" className="btn secondary">Login</Link>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <p>Welcome back, {user.email}. You can manage all posts from here.</p>
      </div>
      {loading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="admin-posts-grid">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="admin-post-card">
                <h3>{post.title}</h3>
                <p>{post.content.slice(0, 120)}{post.content.length > 120 ? '...' : ''}</p>
                <div className="admin-post-meta">
                  <span>{post.category}</span>
                  {post.country && <span>{post.country}</span>}
                  <span>by {post.user?.name || 'Unknown'}</span>
                </div>
                <div className="admin-actions">
                  <Link to={`/posts/${post.id}`} className="btn secondary">View</Link>
                  <button onClick={() => handleDelete(post.id)} className="btn delete">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
