import React from "react";
import { Link } from "react-router-dom";
import "../Home/Home.css";
import { Typography, Button } from "@mui/material";

function User({ userId, name, avatar }) {
  return (
    <Link to={`/user/${userId}`} className="homeUser">
      <img src="" alt="" />
      <Typography>
        {name}
      </Typography>
    </Link>
  );
}

export default User;
