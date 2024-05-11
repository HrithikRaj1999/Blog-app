import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import Layout from "../Component/Layout";
import Home from "../Pages/Home";

// Lazy load the route-specific components
const LoginPage = React.lazy(() => import("../Pages/Login"));
const SignupPage = React.lazy(() => import("../Pages/Signup"));
// const BlogDetails = React.lazy(() => import("../Pages/BlogDetails"));
// const CreateBlog = React.lazy(() => import("../Pages/CreateBlog"));
// const EditBlog = React.lazy(() => import("../Pages/EditBlog"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<ErrorPage />}>
        <Layout />
      </Suspense>
    ),
    children: [
      { index: true, element: <Home /> }, // Assuming a Home component or similar
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      // { path: "blog-details/:blogid", element: <BlogDetails /> },
      // { path: "create-blog", element: <CreateBlog /> },
      // { path: "edit-blog", element: <EditBlog /> },
      { path: "*", element: <h1>No Page Found</h1> },
    ],
  },
]);

export default appRouter;
