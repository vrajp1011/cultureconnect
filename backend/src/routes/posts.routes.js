const router = require("express").Router();
const { authRequired } = require("../middleware/auth");
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require("../controllers/posts.controller");

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", authRequired, createPost);
router.put("/:id", authRequired, updatePost);
router.delete("/:id", authRequired, deletePost);

module.exports = router;
