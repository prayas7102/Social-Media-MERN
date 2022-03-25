const Post = require("../models/Post");
const User = require("../models/User");
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
        user.save();
        // console.log(user,newPost)
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
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Page not found"
            })
        }
        if (post.likes.includes(req.user._id)) {
            const index = post.likes.indexOf(req.user._id);
            post.likes.splice(index, 1);
            res.status(200).json({
                success: true,
                post: "Post Unliked"
            })
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

exports.deletePost = async (req, res) => {
    try{
        const post=await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Page not found",
            });
        }
        if(post.owner.toString() !== req.user._id.toString()){
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        await post.remove();
        const user=await User.findById(req.user._id);
        const index=user.posts.indexOf(req.params.id);
        user.posts.splice(index,1);
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Post deleted",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getPost = async (req, res) => {
    try{
        const user=await User.findById(req.user._id).populate("following","posts");
        console.log(user)
        return res.status(200).json({
            success: true,
            following: user.following,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.updateCaption = async (req, res) => {
        try{
            const post=await Post.findById(req.params._id);
            if(!post){
                return res.status(400).json({
                    success: false,
                    message: "post not found",
                });
            }
            if(!post){
                return res.status(400).json({
                    success: false,
                    message: "post not found",
                });
            }
            post.caption=req.body.caption;
            await post.save();
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
}
    
exports.addComment = async (req, res) => {
    try{
        const post=await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }
        let commentExists=-1;
        post.comments.forEach((element,index) => {
            if(element.user.toString()===req.user._id.toString()){
                commentExists=index;
            }
        });
        if(commentExists!==-1){
            post.comments[commentExists].comment=req.body.comment;
            await post.save();
            return res.status(200).json({
                success: true,
                message: "Comment added",
            });
        }
        else{
            post.comments.push({
                user: req.user._id,
                comment: req.body.comment,
            });
            await post.save();
            return res.status(200).json({
                success: true,
                message: "Comment added",
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

exports.removeComment = async (req, res) => {
    try{
        const post=await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }
        if(post.owner.toString()===req.user._id.toString()){
            if(req.body.commentId===undefined){
                return res.status(400).json({
                    success: false,
                    message: "Comment Id required",
                });
            }
        }
        else{
            post.comments.forEach((item,index)=>{
                if(item.user.toString()===req.user._id.toString()){
                    return post.comments.splice(index,1)
                }
            });
            await post.save();
            return res.status(200).json({
                success: true,
                message: "Comment deleted",
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

// exports.deletePost = async (req, res) => {
//     try{

//     }
//     catch{
        
//     }
// }
