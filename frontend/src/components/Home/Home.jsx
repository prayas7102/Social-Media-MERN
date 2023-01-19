import React, { useEffect } from "react";
import User from "../User/User";
import Post from "../Post/Post";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingPosts } from "../../Actions/User";
import { useAlert } from "react-alert";
import "./Home.css";
function Home() {

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );
  
  useEffect(() => {
    dispatch(getFollowingPosts());
  }, []);
  
  return (
    <div className="home">
      <div className="homeleft">
        <Post
          ownername={"prayas"}
          caption={"ksmxm"}
          postImage={"https://images.unsplash.com/photo-1661961112835-ca6f5811d2af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"}
        />
      </div>
      <div className="homeright">
        <User
          userId={User._id}
          name={"name"}
          avatar={
            "https://images.unsplash.com/photo-1661961112835-ca6f5811d2af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60" ||
            User.avatar.url
          }
        />
      </div>
    </div>
  );
}

export default Home;
