import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { likePost } from "../Actions/Post";
import {useAlert} from "react-alert";
import { userReducer } from "../../Reducers/User";
import { getFollowingPosts } from "../Actions/User";

function Post({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownername,
  ownerId,
  isDelete = false,
  isAccount = false,
}) {
  const [like, setLike] = useState(false);
  const {error,message}=useSelector((state)=>state.like);
  const {user}=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const alert=useAlert();

  const handleLike = () => {
    setLike(!like);
    dispatch(likePost(postId))
    dispatch(getFollowingPosts())
  };

  useEffect(()=>{
    likes.forEach((item)=>{
      if(item._id===user._id) setLike(true)
    })
  },[likes,user._id])

  useEffect(()=>{
    if(error){
      alert.error(error)
    }
    if(message){
      alert.error(message)
    }
  },[alert,error,message])

  return (
    <div>
      <div>
        <div>{isAccount ? <button>Morevert</button> : null}</div>
        <img src={postImage} alt="Post" />
        <div>
          {/*  avatar  */}
          <img src={ownerImage} alt="user" />
        </div>
        <Link to={`/user/${ownerId}`}>{ownername}</Link>
        <div>{caption}</div>
        <div>
          <button>heart</button>
          <button>chat</button>
          <button>delete</button>
        </div>
      </div>
    </div>
  );
}

export default Post;
