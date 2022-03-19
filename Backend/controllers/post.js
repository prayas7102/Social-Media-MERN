const Post = require("../models/Post");
exports.createPost = async (req, res) => {
    try {
        const newPostData = {
            caption: req.body.caption,
            image: {
                public_id: "req.body.public_id",
                url: "req.body.url",
            },
            owner: req.user._id,
        };
        const newPost = await Post.create(newPostData);
        const user = await User.findById(req.user._id);
        user.posts.push(newPost._id);
        res.status(201).json({
            success: true,
            post: newPost
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.likeUnlike = async (req, res) => {
    try {
        const post = await Post.findById(req.params._id);
        if (post.likes.includes(req.user._id)) {
            const index = post.likes.indexOf(req.user._id);
            post.likes.splice(index, 1);
            res.status(200).json({
                success: true,
                post: "Post Unliked"
            })
            post.likes.push(req.user._id)
            await post.save();
        }
        else {
            post.likes.push(req.user._id);
            await post.save();
            res.status(200).json({
                success: true,
                post: "Post liked"
            })
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}