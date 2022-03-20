const express = require("express")
const { register, login, followUser } = require("../controllers/user");
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

router.route("/login").post(login);

router.route("/register").post(register);

router.route("/follow/:id").get(isAuthenticated, followUser);

module.exports = router;