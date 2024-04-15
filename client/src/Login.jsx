import React, { useContext, useState } from "react";
import Input from "./components/Input";
import { ProfileContext } from "./Routes";
import axios from "axios";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const Login = () => {
  const { setProfile } = useContext(ProfileContext);

  const [label, setLabel] = useState("Sign In");

  const [userData, setUserData] = useState(initialValues);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `http://localhost:5172/api/v1/user/${
        label === "Sign In" ? "signin" : "signup"
      }`,
      data: {
        ...userData,
      },
    })
      .then((res) => {
        if (res.data) {
          setProfile({ ...res.data.result, token: res.data.token });
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
          <button onClick={() => setLabel("Sign Up")}>
            Click here to Sign Up
          </button>
        ) : (
          <button onClick={() => setLabel("Sign In")}>
            Click here to Sign In
          </button>
        )}
      </div>
    </form>
  );
};

export default Login;
