import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  SearchOutlined,
  Search,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";
import "./Header.css";

function Header() {
  const [tab, setTab] = useState(window.location.pathname);
  return (
    <div className="header">
      <Link to="/" onClick={() => setTab("/")}>
        {tab === "/" ? <Home /> : <HomeOutlined />}
      </Link>
      <Link to="/newPost" onClick={() => setTab("/newPost")}>
        {tab === "/newPost" ? <Add /> : <AddOutlined />}
      </Link>
      <Link to="/search" onClick={() => setTab("/search")}>
        {tab === "/search" ? <Search /> : <SearchOutlined />}
      </Link>
      <Link to="/account" onClick={() => setTab("/account")}>
        {tab === "/account" ? <AccountCircle /> : <AccountCircleOutlined />}
      </Link>
    </div>
  );
}

export default Header;
