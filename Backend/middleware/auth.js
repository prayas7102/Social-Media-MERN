const User = require("../models/User");
const jwt = require('jsonwebtoken')
exports.isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({
                message: "please login first",
            });
        }
        const decoded = await jwt.verify(token, process.env.SECERET);
        req.user = await User.findById(decoded._id);
        next();
    }
    catch {

    }
}