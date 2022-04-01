import React, { useEffect } from "react";
import User from "../User/User";
import Post from "../Post/Post";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingPosts } from "../Actions/User";

function Home() {
  const dispatch = useDispatch();
  const { loading, posts, error } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(getFollowingPosts());
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <div>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postImage={post.caption}
              ownername={post.owner.name}
              ownerImage={post.owner.avatar.url}
              ownerId={post.owner._id}
              caption={post.caption}
              likes={post.likes}
              comments={post.comments}
            />
          ))
        ) : (
          <div>No post</div>
        )}
      </div>
      <div>
        <User
          userId="{user._id}"
          name="{user.name}"
          avatar="{user.avatar.url}"
        />
      </div>
    </div>
  );
}

export default Home;
