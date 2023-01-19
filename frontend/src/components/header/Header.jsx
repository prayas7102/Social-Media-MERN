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
        {tab === "/" ? <Home style={{ color: "black" }} /> : <HomeOutlined />}
      </Link>
      <Link to="/newPost" onClick={() => setTab("/newPost")}>
        {tab === "/newPost" ? <Add style={{ color: "black" }} /> : <AddOutlined />}
      </Link>
      <Link to="/search" onClick={() => setTab("/search")}>
        {tab === "/search" ? <Search style={{ color: "black" }} /> : <SearchOutlined />}
      </Link>
      <Link to="/account" onClick={() => setTab("/account")}>
        {tab === "/account" ? <AccountCircle style={{ color: "black" }} /> : <AccountCircleOutlined />}
      </Link>
    </div>
  );
}

export default Header;
