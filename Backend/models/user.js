const mongoose = require('mongoose');
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
    followers:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    following:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});
module.exports = mongoose.model("User", userSchema);