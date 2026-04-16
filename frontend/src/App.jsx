// Import necessary modules from React Router for client-side routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import AuthProvider to manage authentication state across the app
import { AuthProvider } from './context/AuthContext';
// Import all the page components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Posts from './components/Posts';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import AdminDashboard from './components/AdminDashboard';
// Import the main stylesheet
import './styles.css';

// Main App component that sets up the application structure
function App() {
  return (
    // Wrap the entire app with AuthProvider to provide authentication context
    <AuthProvider>
      {/* BrowserRouter enables client-side routing */}
      <Router>
        {/* Main app container with CSS class for styling */}
        <div className="App">
          {/* Navbar is always visible at the top */}
          <Navbar />
          {/* Routes define the different pages of the app */}
          <Routes>
            {/* Home page route */}
            <Route path="/" element={<Home />} />
            {/* Login page route */}
            <Route path="/login" element={<Login />} />
            {/* Registration page route */}
            <Route path="/register" element={<Register />} />
            {/* Posts listing page route */}
            <Route path="/posts" element={<Posts />} />
            {/* Individual post detail page with dynamic ID parameter */}
            <Route path="/posts/:id" element={<PostDetail />} />
            {/* Create new post page route */}
            <Route path="/create-post" element={<CreatePost />} />
            {/* Admin dashboard route */}
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Export the App component as the default export
export default App;
