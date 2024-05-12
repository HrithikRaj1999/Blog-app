import { Card, Col } from "react-bootstrap";
import { Blog } from "../../Types";
const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <Col key={blog._id} md={6} lg={4} xl={3}>
      <Card className="blog-card mb-3">
        <Card.Body>
          <Card.Title>{blog.heading}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            By {blog.author}
          </Card.Subtitle>
          <Card.Text className="blog-description">{blog.description}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default BlogCard;
