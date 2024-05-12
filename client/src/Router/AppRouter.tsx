import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import Layout from "../Component/Layout";
import LoginRequiredRoute from "../Component/LoginRequiredRoute";

const LoginPage = lazy(() => import("../Pages/Login"));
const SignupPage = lazy(() => import("../Pages/Signup"));
const Dashboard = lazy(() => import("../Component/Dashboard/Dashboard"));
const Welcome = lazy(() => import("../Component/Dashboard/Welcome"));
const MakeBlog = lazy(() => import("../Component/Blog/MakeBlog"));
const Home = lazy(() => import("../Pages/Home"));
const ShowOwnBlog = lazy(() => import("../Component/Blog/ShowOwnBlog"));
const EditBlog = lazy(() => import("../Component/Blog/EditBlog"));
const EditProfile = lazy(() => import("../Component/Profile/EditProfile"));
const AboutPage = lazy(() => import("../Pages/AboutPage"));
const AllUsersAndBlogs = lazy(
  () => import("../Component/Dashboard/AllUsersAndBlogs")
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<ErrorPage />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignupPage />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: "secure",
        element: <LoginRequiredRoute />,
        children: [
          {
            path: "dashboard",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Dashboard />
              </Suspense>
            ),
            children: [
              {
                path: "edit-profile",
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <EditProfile />
                  </Suspense>
                ),
              },
              {
                path: "user/create-blog",
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <MakeBlog />
                  </Suspense>
                ),
              },
              {
                path: "user/show-own-blog",
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <ShowOwnBlog />
                  </Suspense>
                ),
              },
              {
                path: "user/edit-blog",
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <EditBlog />
                  </Suspense>
                ),
              },
              {
                path: "admin/expose-all",
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <AllUsersAndBlogs />
                  </Suspense>
                ),
              },
              {
                index: true,
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Welcome />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "blog",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            ),
          },
        ],
      },
      { path: "*", element: <h1>No Page Found</h1> },
    ],
  },
]);

export default appRouter;
