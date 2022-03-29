import React, {useState} from "react";
import { Link } from "react-router-dom";
function Header() {
  const setTab=useState("")
  return (
    <div>
      <Link to="/home" onClick={()=>setTab("/home")}>Home</Link>
      <Link to="/newPost" onClick={()=>setTab("/newPost")}>New Post</Link>
      <Link to="/search" onClick={()=>setTab("/search")}>Search</Link>
      <Link to="/account" onClick={()=>setTab("/account")}>Home</Link>
    </div>
  );
}

export default Header;
