import React, { useEffect } from "react";
import User from "../User/User";
import Post from "../Post/Post";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingPosts } from "../../Actions/User";
import { useAlert } from "react-alert";
import "./Home.css";
function Home() {
  return (
    <div className="home">
      <div className="homeleft">
        <Post
          ownername={"prayas"}
          caption={"ksmxm"}
          postImage={
            "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2015%2F04%2F23%2F22%2F00%2Ftree-736885__480.jpg&imgrefurl=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fnature%2F&tbnid=DH7p1w2o_fIU8M&vet=12ahUKEwiomKyJxOb3AhWz_DgGHZcxD4sQMygBegUIARCzAQ..i&docid=Ba_eiczVaD9-zM&w=771&h=480&q=image&ved=2ahUKEwiomKyJxOb3AhWz_DgGHZcxD4sQMygBegUIARCzAQ"
          }
        />
      </div>
      <div className="homeright">
        <User
          userId={User._id}
          name={"name"}
          avatar={
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fin.linkedin.com%2Fpub%2Fdir%2FPrayas%2FKumar%2Fin-0-India&psig=AOvVaw1nrLQyfSYhCODQZUnJ-R4k&ust=1652871624640000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCOCX2-Cw5vcCFQAAAAAdAAAAABAD" ||
            User.avatar.url
          }
        />
      </div>
    </div>
  );
}

export default Home;
