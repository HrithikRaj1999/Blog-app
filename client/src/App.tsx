import { RouterProvider } from "react-router-dom";
import "./App.css";
import appRouter from "./Router/AppRouter";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { useEffect } from "react";
import { fetchBlogs } from "./ReduxSlice/blogSlice";
function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
