// Import Express and create a Router instance
const router = require("express").Router();

// Import authentication middleware
// This ensures only logged-in users can perform certain actions
const { authRequired } = require("../middleware/auth");

// Import comment controller functions
// getCommentsForPost → Fetch all comments for a specific post
// addCommentToPost → Add a new comment to a specific post
// deleteComment → Delete a specific comment
const { 
  getCommentsForPost, 
  addCommentToPost, 
  deleteComment 
} = require("../controllers/comments.controller");


// ================= COMMENT ROUTES =================

// GET /posts/:id/comments
// Public route - Retrieve all comments for a specific post (by post ID)
router.get("/posts/:id/comments", getCommentsForPost);

// POST /posts/:id/comments
// Protected route - Add a new comment to a specific post
// User must be authenticated
router.post("/posts/:id/comments", authRequired, addCommentToPost);

// DELETE /comments/:id
// Protected route - Delete a specific comment by comment ID
// User must be authenticated
router.delete("/comments/:id", authRequired, deleteComment);


// Export router so it can be used in app.js
module.exports = router;