const prisma = require("../config/prisma");

async function getAllPosts(req, res, next) {
  try {
    const posts = await prisma.culturalPost.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: { select: { id: true, name: true, email: true } }, _count: { select: { comments: true } } },
    });
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

async function getPostById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const post = await prisma.culturalPost.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        comments: { orderBy: { createdAt: "asc" }, include: { user: { select: { id: true, name: true, email: true } } } },
      },
    });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    next(err);
  }
}

async function createPost(req, res, next) {
  try {
    const { title, category, country, content, imageUrl } = req.body;
    if (!title || !category || !content) return res.status(400).json({ message: "title, category, content are required" });

    const post = await prisma.culturalPost.create({
      data: { title, category, country: country || null, content, imageUrl: imageUrl || null, userId: req.user.id },
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

async function updatePost(req, res, next) {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.culturalPost.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: "Post not found" });
    if (existing.userId !== req.user.id) return res.status(403).json({ message: "Not allowed" });

    const updated = await prisma.culturalPost.update({
      where: { id },
      data: {
        title: req.body.title ?? existing.title,
        category: req.body.category ?? existing.category,
        country: req.body.country ?? existing.country,
        content: req.body.content ?? existing.content,
        imageUrl: req.body.imageUrl ?? existing.imageUrl,
      },
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
}

async function deletePost(req, res, next) {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.culturalPost.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: "Post not found" });
    if (existing.userId !== req.user.id) return res.status(403).json({ message: "Not allowed" });

    await prisma.culturalPost.delete({ where: { id } });
    res.json({ message: "Post deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
