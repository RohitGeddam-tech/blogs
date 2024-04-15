import React, { useContext, useState } from "react";
import { ProfileContext } from "../Routes";
import { Link } from "react-router-dom";

const Header = () => {
  const { profile, setProfile } = useContext(ProfileContext);

  return (
    <header>
      <h2>My Blogs</h2>
      {!profile?.name ? (
        <Link to="/signin">
          <button>{"Signin"}</button>
        </Link>
      ) : (
        <button
          onClick={() => {
            localStorage.removeItem("user");
            setProfile({});
          }}
        >
          {"Signout"}
        </button>
      )}
    </header>
  );
};

export default Header;
