import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../store/store";
import { Blog } from "../../Types";

function useHome() {
  const blogs = useSelector((state: RootState) => state.blogs.blogs);
  const userData = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  const [viewedBlog, setViewedBlog] = useState<Blog | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleView = (blog: Blog) => {
    setViewedBlog(blog);
    setShowModal(true);
  };
  return {
    blogs,
    userData,
    location,
    setShowModal,
    viewedBlog,
    showModal,
    handleView,
  };
}

export default useHome;
