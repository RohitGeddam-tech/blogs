import React, { Suspense, createContext, lazy, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Header from "./components/Header.jsx";
// import App from "./App.jsx";
// import Login from "./Login.jsx";
// import BlogForm from "./BlogForm.jsx";
// import BlogDetail from "./BlogDetail.jsx";

const App = lazy(() => import("./App.jsx"));
const Login = lazy(() => import("./Login.jsx"));
const BlogForm = lazy(() => import("./BlogForm.jsx"));
const BlogDetail = lazy(() => import("./BlogDetail.jsx"));
const Header = lazy(() => import("./components/Header.jsx"));

export const ProfileContext = createContext({});

export const Routes = () => {
  const [profile, setProfile] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Header />
          <App />
        </Suspense>
      ),
    },
    {
      path: "/signin",
      element: (
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Header />
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/blog-form",
      element: (
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Header />
          <BlogForm />
        </Suspense>
      ),
    },
    {
      path: "/blog-detail",
      element: (
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Header />
          <BlogDetail />
        </Suspense>
      ),
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
