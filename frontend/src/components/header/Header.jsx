import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div>
        
      <Link to="/home">Home</Link>
      <Link to="/newPost">New Post</Link>
      <Link to="/search">Search</Link>
      <Link to="/account">Home</Link>
    </div>
  );
}

export default Header;
