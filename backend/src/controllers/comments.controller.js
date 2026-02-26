// Import Prisma client to interact with the database
const prisma = require("../config/prisma");


// ================= GET COMMENTS FOR A POST =================
// Public route
// Returns all comments for a specific post (postId comes from URL param :id)
async function getCommentsForPost(req, res, next) {
  try {
    // Convert post ID from string to number
    const postId = Number(req.params.id);

    // Check if the post exists (avoid returning comments for invalid post)
    const post = await prisma.culturalPost.findUnique({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Fetch comments for this post (oldest first)
    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: "asc" },

      // Include basic user info for each comment (who wrote it)
      include: {
        user: { select: { id: true, name: true, email: true } }
      },
    });

    // Return comments array
    res.json(comments);

  } catch (err) {
    // Forward error to global error handler middleware
    next(err);
  }
}


// ================= ADD COMMENT TO A POST =================
// Protected route (requires auth middleware)
// Creates a new comment on a given post
async function addCommentToPost(req, res, next) {
  try {
    // Get post ID from URL
    const postId = Number(req.params.id);

    // Extract comment text from request body
    const { content } = req.body;

    // Validate required field
    if (!content) {
      return res.status(400).json({ message: "content is required" });
    }

    // Confirm the post exists before adding comment
    const post = await prisma.culturalPost.findUnique({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create the comment and attach the logged-in user as author
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        userId: req.user.id, // comes from JWT decoded user in authRequired middleware
      },
      include: {
        user: { select: { id: true, name: true, email: true } }
      },
    });

    // Return created comment
    res.status(201).json(comment);

  } catch (err) {
    next(err);
  }
}


// ================= DELETE COMMENT =================
// Protected route
// Only the comment owner can delete their comment
async function deleteComment(req, res, next) {
  try {
    // Get comment ID from URL
    const id = Number(req.params.id);

    // Find the existing comment
    const existing = await prisma.comment.findUnique({ where: { id } });

    // If not found, return 404
    if (!existing) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Authorization: only owner can delete
    if (existing.userId !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // Delete the comment
    await prisma.comment.delete({ where: { id } });

    // Success response
    res.json({ message: "Comment deleted" });

  } catch (err) {
    next(err);
  }
}


// Export controller functions for routes usage
module.exports = {
  getCommentsForPost,
  addCommentToPost,
  deleteComment
};