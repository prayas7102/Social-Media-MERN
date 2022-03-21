const express = require("express")
const { createPost, likeUnlike, deletePost,
        getPost, addComment, removeComment } = require("../controllers/post");
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);

router.route("/post/:id")
    .get(isAuthenticated, likeUnlike)
    .delete(isAuthenticated, deletePost)
    .put(isAuthenticated,deletePost)

router.route("/posts").get(isAuthenticated, getPost);

router.route("/post/comment/:id")
      .put(isAuthenticated,addComment)
      .delete(isAuthenticated,removeComment)


module.exports = router;