import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Blog } from "../Types";
import BlogCard from "../Component/Blog/BlogCard";

const Home: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get<Blog[]>(
        `${process.env.REACT_APP_SERVER_URL}/blog/`,
        { withCredentials: true }
      );
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

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
