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
      {
        path: "secure",
        element: <LoginRequiredRoute />,
        children: [
          { path: "blog-details/:blogid", element: <BlogDetails /> },
          {
            path: "dashboard",
            element: <Dashboard />,
            children: [
              { path: "create-blog", element: <MakeBlog /> },
              // { path: "profile", element: <ProfileComponent /> },
              // { path: "settings", element: <SettingsComponent /> },
              // { path: "analytics", element: <AnalyticsComponent /> },
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
