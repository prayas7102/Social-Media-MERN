const express = require("express")
const { createPost, likeUnlike, deletePost } = require("../controllers/post");
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();
router.route("/post/upload").post(isAuthenticated, createPost);
router.route("/post/:id")
    .get(isAuthenticated, likeUnlike)
    .delete(isAuthenticated, deletePost);

module.exports = router;