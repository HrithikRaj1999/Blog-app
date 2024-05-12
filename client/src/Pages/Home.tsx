// Home.tsx
import React from "react";
import { Container, Row } from "react-bootstrap";
import BlogCard from "../Component/Blog/BlogCard";
import BlogModal from "../Component/Blog/BlogModal";
import { Navigate } from "react-router-dom";
import useHome from "../hooks/home/useHome";

const Home: React.FC = () => {
  const {
    blogs,
    userData,
    location,
    setShowModal,
    viewedBlog,
    showModal,
    handleView,
  } = useHome();
  
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
