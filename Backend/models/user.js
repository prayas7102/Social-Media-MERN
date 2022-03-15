const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter value"],
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
    followers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        console.log(this.password)
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.matchPassword = async (password) => {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = async () => {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
}

module.exports = mongoose.model("User", userSchema);