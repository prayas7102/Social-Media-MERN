import React from "react";
import { Link } from "react-router-dom";

function User({ userId, name, avatar }) {
  return (
    <Link to={`/user/${userId}`}>
      <img src="" alt="" />
    </Link>
  );
}

export default User;
