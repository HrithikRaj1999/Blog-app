import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import Layout from "../Component/Layout";
import LoginPage from "../Pages/Login";
import SignupPage from "../Pages/Signup";
import LoginRequiredRoute from "../Component/LoginRequiredRoute";
import BlogDetails from "../Pages/BlogDetails";
import Dashboard from "../Component/Dashboard/Dashboard";
import Welcome from "../Component/Dashboard/Welcome";

// // Lazy load the route-specific components
// const LoginPage = React.lazy(() => import("../Pages/Login"));
// const SignupPage = React.lazy(() => import("../Pages/Signup"));
// // const BlogDetails = React.lazy(() => import("../Pages/BlogDetails"));
// // const CreateBlog = React.lazy(() => import("../Pages/CreateBlog"));
// // const EditBlog = React.lazy(() => import("../Pages/EditBlog"));
import MakeBlog from "./../Component/Blog/MakeBlog";
import Home from "../Pages/Home";
import ShowOwnBlog from "../Component/Blog/ShowOwnBlog";
import EditBlog from "../Component/Blog/EditBlog";
import EditProfile from "../Component/Profile/EditProfile";
import AboutPage from "../Pages/AboutPage";
import AllUsersAndBlogs from "../Component/Dashboard/AllUsersAndBlogs";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<ErrorPage />}>
        <Layout />
      </Suspense>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "about", element: <AboutPage /> },
      {
        path: "secure",
        element: <LoginRequiredRoute />,
        children: [
          { path: "blog-details/:blogid", element: <BlogDetails /> },
          {
            path: "dashboard",
            element: <Dashboard />,
            children: [
              { path: "edit-profile", element: <EditProfile /> },
              
              { path: "user/create-blog", element: <MakeBlog /> },
              { path: "user/show-own-blog", element: <ShowOwnBlog /> },
              { path: "user/edit-blog", element: <EditBlog /> },
              { path: "admin/expose-all", element: <AllUsersAndBlogs /> },
              // { path: "user/show-own-blog", element: <ShowOwnBlog /> },
              // { path: "user/edit-blog", element: <EditBlog /> },
              // { path: "user/edit-profile", element: <EditProfile /> },
              { index: true, element: <Welcome /> },
            ],
          },
          { path: "blog", element: <Home /> },
        ],
      },

      { path: "*", element: <h1>No Page Found</h1> },
    ],
  },
]);

export default appRouter;
