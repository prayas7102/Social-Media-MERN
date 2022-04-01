import React from "react";
import User from "../User/User";
import Post from "../Post/Post";

function Home() {
  return (
    <div>
      <div>
        <Post postImage="" ownername={""} caption="" />
      </div>
      <div>
        <User userId="{user._id}" name="{user.name}" avatar="{user.avatar.url}" />
      </div>
    </div>
  );
}

export default Home;
