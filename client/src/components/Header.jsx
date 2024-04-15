import React, { useContext, useState } from "react";
import { ProfileContext } from "../Routes";
import { Link } from "react-router-dom";

const Header = () => {
  const { profile, setProfile } = useContext(ProfileContext);

  return (
    <header>
      <nav>
        <Link to="/">
          <h2 className="logo">My Blogs</h2>
        </Link>
        {!profile?.name ? (
          <Link to="/signin">
            <button className="alt-btn">{"Signin"}</button>
          </Link>
        ) : (
          <button
            className="alt-btn"
            onClick={() => {
              localStorage.removeItem("user");
              setProfile({});
            }}
          >
            {"Signout"}
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
