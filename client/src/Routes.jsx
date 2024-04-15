import React, { createContext, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Login from "./Login.jsx";
import BlogForm from "./BlogForm.jsx";
import BlogDetail from "./BlogDetail.jsx";

export const ProfileContext = createContext({});

export const Routes = () => {
  const [profile, setProfile] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/signin",
      element: <Login />,
    },
    {
      path: "/blog-form",
      element: <BlogForm />,
    },
    {
      path: "/blog-detail",
      element: <BlogDetail />,
    },
  ]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ProfileContext.Provider>
  );
};
