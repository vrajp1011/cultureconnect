const router = require("express").Router();
const { authRequired } = require("../middleware/auth");
const { getCommentsForPost, addCommentToPost, deleteComment } = require("../controllers/comments.controller");

router.get("/posts/:id/comments", getCommentsForPost);
router.post("/posts/:id/comments", authRequired, addCommentToPost);
router.delete("/comments/:id", authRequired, deleteComment);

module.exports = router;
