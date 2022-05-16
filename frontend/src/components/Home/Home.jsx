import React, { useEffect } from "react";
import User from "../User/User";
import Post from "../Post/Post";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingPosts } from "../../Actions/User";
import {useAlert} from "react-alert";

function Home() {
  const dispatch = useDispatch();
  const alert=useAlert();
  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );
  const { users, loading: userLoading } = useSelector(
    (state) => state.allUsers
  );

  const {error:likeError,message}=useSelector((state)=>state.like);

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  }, [dispatch]);
  
  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch({type:"clearErrors"});
    }
    if(likeError){
      alert.error(message)
      dispatch({type:"clearErrors"})
    }
    if(message){
      alert.success(message)
      dispatch({type:"clearMessage"})
    }
  },[alert,error,message])

  return loading || userLoading ? (
    <Loader />
  ) : (
    <div>
      <div>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postImage={post.image.url}
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
        {users && users.length > 0 ? (
          users.map((user) => {
            <User
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
            />;
          })
        ) : (
          <div>No Users</div>
        )}
      </div>
    </div>
  );
}

export default Home;
