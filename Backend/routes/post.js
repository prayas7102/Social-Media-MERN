const express = require("express")
const { createdPost } = require("../controllers/post");
const router = express.Router();
router.route("/post/upload").post(createdPost);
module.exports = router;