// Import Prisma client to interact with the database
const prisma = require("../config/prisma");


// ================= GET ALL POSTS =================
// Fetch all cultural posts from database
// Public route
async function getAllPosts(req, res, next) {
  try {
    const posts = await prisma.culturalPost.findMany({
      // Show newest posts first
      orderBy: { createdAt: "desc" },

      // Include related user info + comment count
      include: {
        user: { 
          select: { id: true, name: true, email: true } 
        },
        _count: { 
          select: { comments: true } 
        },
      },
    });

    res.json(posts);

  } catch (err) {
    next(err); // Pass error to global error handler
  }
}


// ================= GET POST BY ID =================
// Fetch a single post with all comments
// Public route
async function getPostById(req, res, next) {
  try {
    const id = Number(req.params.id);

    const post = await prisma.culturalPost.findUnique({
      where: { id },

      // Include author info + comments with commenter info
      include: {
        user: { 
          select: { id: true, name: true, email: true } 
        },
        comments: {
          orderBy: { createdAt: "asc" },
          include: {
            user: { 
              select: { id: true, name: true, email: true } 
            }
          }
        },
      },
    });

    // If post not found
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);

  } catch (err) {
    next(err);
  }
}


// ================= CREATE POST =================
// Create a new cultural post
// Protected route (requires authentication)
async function createPost(req, res, next) {
  try {
    const { title, category, country, content, imageUrl } = req.body;

    // Validate required fields
    if (!title || !category || !content) {
      return res.status(400).json({ message: "title, category, content are required" });
    }

    const post = await prisma.culturalPost.create({
      data: {
        title,
        category,
        country: country || null,
        content,
        imageUrl: imageUrl || null,
        userId: req.user.id, // From auth middleware
      },

      include: {
        user: { 
          select: { id: true, name: true, email: true } 
        }
      },
    });

    res.status(201).json(post);

  } catch (err) {
    next(err);
  }
}


// ================= UPDATE POST =================
// Update an existing post
// Only the post owner can update
// Protected route
async function updatePost(req, res, next) {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.culturalPost.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Authorization check (only owner allowed)
    if (existing.userId !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updated = await prisma.culturalPost.update({
      where: { id },

      // Update only provided fields (nullish coalescing)
      data: {
        title: req.body.title ?? existing.title,
        category: req.body.category ?? existing.category,
        country: req.body.country ?? existing.country,
        content: req.body.content ?? existing.content,
        imageUrl: req.body.imageUrl ?? existing.imageUrl,
      },

      include: {
        user: { 
          select: { id: true, name: true, email: true } 
        }
      },
    });

    res.json(updated);

  } catch (err) {
    next(err);
  }
}


// ================= DELETE POST =================
// Delete a post
// Only the post owner can delete
// Protected route
async function deletePost(req, res, next) {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.culturalPost.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Authorization check
    if (existing.userId !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await prisma.culturalPost.delete({ where: { id } });

    res.json({ message: "Post deleted" });

  } catch (err) {
    next(err);
  }
}


// Export all controller functions
module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};