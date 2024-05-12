import { Button, Card, Col } from "react-bootstrap";
import { Blog } from "../../Types";
const BlogCard = ({
  blog,
  writable = false,
  handleEdit = () => null,
  handleDelete = () => null,
}: {
  blog: Blog;
  writable?: boolean;
  handleEdit?: (initData: Blog) => void;
  handleDelete?: () => null;
}) => {
  return (
    <Col
      key={blog._id}
      xs={12}
      sm={12} 
      md={6}
      lg={4}
      xl={3}
      className="mb-3" 
    >
      <Card
        className="blog-card"
        style={{
          width: "100%", 
          height: "100%",
        }}
      >
        <Card.Body>
          <Card.Title>{blog.heading}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            By {blog.author}
          </Card.Subtitle>
          <Card.Text className="blog-description">{blog.description}</Card.Text>
          {writable && (
            <div className="d-flex justify-content-end">
              <Button
                variant="warning"
                size="sm"
                className="me-2"
                onClick={() => {
                  if (Object.values(blog).length) {
                    handleEdit(blog);
                  }
                }}
              >
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default BlogCard;
