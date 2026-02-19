const prisma = require("../config/prisma");

async function getCommentsForPost(req, res, next) {
  try {
    const postId = Number(req.params.id);
    const post = await prisma.culturalPost.findUnique({ where: { id: postId } });
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: "asc" },
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    res.json(comments);
  } catch (err) {
    next(err);
  }
}

async function addCommentToPost(req, res, next) {
  try {
    const postId = Number(req.params.id);
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "content is required" });

    const post = await prisma.culturalPost.findUnique({ where: { id: postId } });
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = await prisma.comment.create({
      data: { content, postId, userId: req.user.id },
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
}

async function deleteComment(req, res, next) {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.comment.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: "Comment not found" });
    if (existing.userId !== req.user.id) return res.status(403).json({ message: "Not allowed" });

    await prisma.comment.delete({ where: { id } });
    res.json({ message: "Comment deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { getCommentsForPost, addCommentToPost, deleteComment };
