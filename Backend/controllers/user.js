const User = require("../models/User");
const Post = require("../models/Post");

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

exports.logout = async (req, res) => {
    try {
        res
            .status(200)
            .cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true
            })
            .json({
                success: true,
                message: "Log out",
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

exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findOne(req.user._id);
        const { name, email } = req.body;
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        await user.save();

        res.status(200).json({
            success: true,
            message: "User Updated",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const user = await User.findOne(req.user._id);
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please provide Old and New Password",
            });
        }
        const isMatch = await User.matchPassword(oldPassword);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Old Password"
            });
        }
        user.password = newPassword;
        await user.save();
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.deleteMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const posts = user.posts;
        const followers = user.followers;
        await user.remove();
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        for (let i = 0; i < posts.length; i++) {
            const post = await Post.findById(post[i]);
            await post.remove();
        }
        for (let i = 0; i < followers.length; i++) {
            const follower = await User.findById(followers[i]);
            const index = follower.following.indexOf(user._id)
            follower.following.splice(index, 1);
            await follower.save();
        }
        const followings = user.following;
        for (let i = 0; i < followings.length; i++) {
            const following = await User.findById(followings[i]);
            const index = following.followers.indexOf(user._id)
            following.following.splice(index, 1);
            await following.save();
        }
        res.status(200).json({
            success: true,
            message: "Profile Deleted",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.MyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("posts");
        if(!user){
            res.status(404).json({
                success: false,
                message: "user not found",
            });
        }
        res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}