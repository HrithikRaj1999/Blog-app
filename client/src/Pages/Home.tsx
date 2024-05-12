// Home.tsx
import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import BlogCard from "../Component/Blog/BlogCard";
import BlogModal from "../Component/Blog/BlogModal";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate, useLocation } from "react-router-dom";
import { Blog } from "../Types";

const Home: React.FC = () => {
  const blogs = useSelector((state: RootState) => state.blogs.blogs);
  const userData = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  const [viewedBlog, setViewedBlog] = useState<Blog | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleView = (blog: Blog) => {
    setViewedBlog(blog);
    setShowModal(true);
  };

  if (!userData.isLoggedIn || !userData.user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        {blogs.map((blog, index) => (
          <BlogCard blog={blog} key={index} handleView={handleView} />
        ))}
      </Row>
      <BlogModal
        show={showModal}
        onHide={() => setShowModal(false)}
        blog={viewedBlog}
      />
    </Container>
  );
};

export default Home;
