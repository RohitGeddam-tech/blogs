import React, { useState } from "react";
import Input from "./components/Input";
import axios from "axios";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const Login = () => {
  const [label, setLabel] = useState("Sign In");

  const [userData, setUserData] = useState(initialValues);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("please enter a valid Email and Password");
    } else {
      axios({
        method: "post",
        url: `${import.meta.env.VITE_URL}api/v1/user/${
          label === "Sign In" ? "signin" : "signup"
        }`,
        data: {
          ...userData,
        },
      })
        .then((res) => {
          if (res.data) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                ...res.data.result,
                token: res.data.token,
              })
            );
            window.location.href = "/";
          }
        })
        .catch((err) => {
          err.message && alert(err.message);
        });
    }

    // console.log(userData, label);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2>{label}</h2>
      {label === "Sign In" ? (
        <>
          <div className="form">
            <Input
              label={"Email"}
              value={userData.email}
              handleChange={handleChange}
              name="email"
            />
            <Input
              label={"Password"}
              value={userData.password}
              handleChange={handleChange}
              name="password"
              type="password"
            />
          </div>
        </>
      ) : (
        <>
          <div className="form">
            <Input
              label={"Name"}
              value={userData.name}
              handleChange={handleChange}
              name="name"
            />
            <Input
              label={"Email"}
              value={userData.email}
              handleChange={handleChange}
              name="email"
            />
            <Input
              label={"Password"}
              value={userData.password}
              handleChange={handleChange}
              name="password"
              type="password"
            />
          </div>
        </>
      )}
      <button>Submit</button>
      <div className="tab">
        {label === "Sign In" ? (
          <button type="button" onClick={() => setLabel("Sign Up")}>
            Click here to Sign Up
          </button>
        ) : (
          <button type="button" onClick={() => setLabel("Sign In")}>
            Click here to Sign In
          </button>
        )}
      </div>
    </form>
  );
};

export default Login;
