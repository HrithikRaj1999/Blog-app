import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

interface Blog {
  _id: string;
  heading: string;
  author: string;
  description: string;
}

const AllBlogsPage: React.FC = () => {
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
    <Container>
      <Row>
        {blogs.map((blog) => (
          <Col key={blog._id} md={5}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{blog.heading}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  By {blog.author}
                </Card.Subtitle>
                <Card.Text>{blog.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllBlogsPage;
