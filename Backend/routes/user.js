const express = require("express");
const { addComment } = require("../controllers/post");
const {
    register, login, followUser,
    logout, updateProfile, updatePassword,
    deleteMyProfile, MyProfile, getAllUser, 
    getUserProfile,
    forgotPassword
} = require("../controllers/user");
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

router.route("/login").post(login);

router.route("/register").post(register);

router.route("/follow/:id").get(isAuthenticated, followUser);

router.route("/logout").get(logout);

router.route("/update/password").put(isAuthenticated, updatePassword);

router.route("/update/profile").put(isAuthenticated, updateProfile);

router.route("/delete/me").delete(isAuthenticated, deleteMyProfile);

router.route("/myProfile").get(isAuthenticated, MyProfile);

router.route("/user/:id").get(isAuthenticated, getUserProfile);

router.route("/users").get(isAuthenticated, getAllUser);

router.route("/forgot/password").post(isAuthenticated, forgotPassword);

module.exports = router;