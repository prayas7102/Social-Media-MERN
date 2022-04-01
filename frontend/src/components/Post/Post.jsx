import React, { useState } from "react";
import { Link } from "react-router-dom";

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
  const [like,setLike]=useState(false)
  const handleLike=()=>{
      setLike(!like)
  }
  return (
    <div>
      <div>
        <div>
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
