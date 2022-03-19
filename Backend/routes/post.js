const express = require("express")
const { createPost } = require("../controllers/post");
const { isAuthenticated } = require('../middleware/auth');
const router = express.Router();
router.route("/post/upload").post(isAuthenticated, createPost);
module.exports = router;