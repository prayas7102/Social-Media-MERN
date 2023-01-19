import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { likePost } from "../../Actions/Post";
import { useAlert } from "react-alert";
import { userReducer } from "../../Reducers/User";
import { getFollowingPosts } from "../../Actions/User";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { Avatar, Typography, Button } from "@mui/material";

function Post({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage = "https://images.unsplash.com/photo-1661961112835-ca6f5811d2af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60",
  ownername,
  ownerId,
  isDelete = false,
  isAccount = false,
}) {
  const [like, setLike] = useState(false);
  const { error, message } = useSelector((state) => state.like);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const alert = useAlert();

  const handleLike = () => {
    setLike(!like);
    dispatch(likePost(postId));
    dispatch(getFollowingPosts());
  };

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) setLike(true);
    });
  }, [likes, user._id]);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (message) {
      alert.error(message);
    }
  }, [alert, error, message]);

  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? <Button><MoreVert /></Button> : null}
      </div>
      <img src={postImage} alt="Post" />
      <div className="postDetails">
        <Avatar src={ownerImage} alt="userimage" sx={{ height: "3vmax", width: "3vmax" }} />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownername}</Typography>
        </Link>
        <Typography
          fontWeight={100}
          color="rgba(0, 0, 0, 0.582)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>
      <div className="postFooter">
        <Button onClick={handleLike}>
          {like ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>
        <Button><ChatBubbleOutline /></Button>
        {isDelete?<Button><DeleteOutline /></Button>:null}
      </div>
    </div>
  );
}

export default Post;
