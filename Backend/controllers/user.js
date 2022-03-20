const User = require("../models/User");
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        user = await User.create({
            name, email, password,
            avatar: { public_id: "sample_id", url: "sampleurl" }
        })

        const token = await user.generateToken();
        const option = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 60),
            httpOnly: true,
        }
        res.status(200).cookie("token", token, option).json({
            success: true,
            user,
            token,
        });

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }
        const isMatch = await User.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            });
        }
        const token = await User.generateToken();
        const option = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 60),
            httpOnly: true,
        }
        res.status(200).cookie("token", token, option).json({
            success: true,
            user,
            token,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.followUser = async (req, res) => {
    try {
        const followedUser = await User.findById(req.params._id);
        const followingUser = await User.findById(req.user._id);
        
        if (!followedUser) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        if (followingUser.following.includes(followedUser._id)) {
            const indexfollowing = followingUser.following.indexOf(followedUser._id)
            const indexfollowers = followingUser.followers.indexOf(followingUser._id)

            indexfollowing.following.splice(indexfollowing, 1);
            indexfollowers.followers.splice(indexfollowers, 1);

            await followingUser.save();
            await followedUser.save();

            res.status(200).json({
                success: true,
                message: "User unfollowed",
            });
        }
        else {
            followingUser.following.push(followedUser._id);
            followedUser.followers.push(followingUser._id);

            await followingUser.save();
            await followedUser.save();

            res.status(200).json({
                success: true,
                message: "User followed",
            });
        }

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}