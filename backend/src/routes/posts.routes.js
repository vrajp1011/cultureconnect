// Import Express and create a new Router instance
const router = require("express").Router();

// Import authentication middleware
// This middleware protects routes that require a logged-in user
const { authRequired } = require("../middleware/auth");

// Import controller functions for handling post operations
const { 
  getAllPosts,     // Fetch all posts from database
  getPostById,     // Fetch a single post by ID
  createPost,      // Create a new post
  updatePost,      // Update an existing post
  deletePost       // Delete a post
} = require("../controllers/posts.controller");


// ================= ROUTES =================

// GET /posts
// Public route - Retrieve all posts
router.get("/", getAllPosts);

// GET /posts/:id
// Public route - Retrieve a specific post by ID
router.get("/:id", getPostById);

// POST /posts
// Protected route - Create a new post
// User must be authenticated
router.post("/", authRequired, createPost);

// PUT /posts/:id
// Protected route - Update an existing post by ID
// User must be authenticated
router.put("/:id", authRequired, updatePost);

// DELETE /posts/:id
// Protected route - Delete a post by ID
// User must be authenticated
router.delete("/:id", authRequired, deletePost);


// Export the router so it can be used in app.js
module.exports = router;