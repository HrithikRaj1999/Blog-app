import React from "react";
import { Container, Row } from "react-bootstrap";
import BlogCard from "../Component/Blog/BlogCard";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Navigate, useLocation } from "react-router-dom";

const Home: React.FC = () => {
  const blogs = useSelector((state: RootState) => state.blogs.blogs);
  const userData = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  if (!userData.isLoggedIn || !userData.user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        {blogs.map((blog) => (
          <BlogCard blog={blog} />
        ))}
      </Row>
    </Container>
  );
};

export default Home;
