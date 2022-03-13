const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "please enter value"], },
    email: { type: String, required: [true, "please enter value"], unique: [true, "email already exists"] },
    password: { type: String, required: [true, "please enter password"], minilength: [6, "password must be 6 characters"], select: false, },
});
module.exports = mongoose.model("User", userSchema);