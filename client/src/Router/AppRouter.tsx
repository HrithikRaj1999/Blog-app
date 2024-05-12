import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import Layout from "../Component/Layout";
import LoginRequiredRoute from "../Component/LoginRequiredRoute";
import CenteredSpinner from "../Component/CenteredSpinner";

const LoginPage = lazy(() => import("../Pages/Login"));
const SignupPage = lazy(() => import("../Pages/Signup"));
const Dashboard = lazy(() => import("../Component/Dashboard/Dashboard"));
const Welcome = lazy(() => import("../Component/Welcome"));
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
          <Suspense fallback={<CenteredSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<CenteredSpinner />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<CenteredSpinner />}>
            <SignupPage />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<CenteredSpinner />}>
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
              <Suspense fallback={<CenteredSpinner />}>
                <Dashboard />
              </Suspense>
            ),
            children: [
              {
                path: "edit-profile",
                element: (
                  <Suspense fallback={<CenteredSpinner />}>
                    <EditProfile />
                  </Suspense>
                ),
              },
              {
                path: "user/create-blog",
                element: (
                  <Suspense fallback={<CenteredSpinner />}>
                    <MakeBlog />
                  </Suspense>
                ),
              },
              {
                path: "user/show-own-blog",
                element: (
                  <Suspense fallback={<CenteredSpinner />}>
                    <ShowOwnBlog />
                  </Suspense>
                ),
              },
              {
                path: "user/edit-blog",
                element: (
                  <Suspense fallback={<CenteredSpinner />}>
                    <EditBlog />
                  </Suspense>
                ),
              },
              {
                path: "admin/expose-all",
                element: (
                  <Suspense fallback={<CenteredSpinner />}>
                    <AllUsersAndBlogs />
                  </Suspense>
                ),
              },
              {
                index: true,
                element: (
                  <Suspense fallback={<CenteredSpinner />}>
                    <Welcome />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "blog",
            element: (
              <Suspense fallback={<CenteredSpinner />}>
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
