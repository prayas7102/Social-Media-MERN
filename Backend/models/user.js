const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter value"],
    },
    avatar: {
        public_id: String,
        url: String,
    },
    email: {
        type: String,
        required: [true, "please enter value"],
        unique: [true, "email already exists"]
    },
    password: {
        type: String,
        required: [true, "please enter password"],
        minilength: [6, "password must be 6 characters"],
        select: false,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    resetPasswordToken: String,
    resetPasswordExpire: String
});
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.matchPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

userSchema.methods.generateToken = async (id) => {
    return jwt.sign({ _id: id }, process.env.JWT_SECRET)
}

userSchema.methods.getResetPasswordToken = async (user) => {
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto
        .createHmac('sha256', 'a secret')
        .update(resetToken)
        .digest("hex");
    user.resetPasswordExpire = Date.now() * 10 * 60 * 1000;
    await user.save();
    return resetToken;
}

module.exports = mongoose.model("User", userSchema);