import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { SetStateAction } from "react";
import { Blog } from "../../Types";

const UserBlogs = ({
  userId,
  disabled = false,
  setIdToDelete,
  setShowDeleteModal,
  handleView = () => null,
}: {
  userId: string;
  disabled: boolean;
  handleView?: (blog: Blog) => void;
  setIdToDelete: React.Dispatch<SetStateAction<string>>;
  setShowDeleteModal: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const blogs = useSelector((state: RootState) => state.blogs.blogs).filter(
    (blog) => blog.createdBy === userId
  );
  if (!blogs.length) return <h1>No Blogs</h1>;
  return (
    <Row>
      {blogs.map((blog) => (
        <Col xs={12} sm={12} md={6} lg={4} xl={3} className="mb-3">
          <Card
            className="blog-card"
            style={{ width: "100%", cursor: "pointer" }}
            onClick={() => handleView(blog)}
          >
            <Card.Body>
              <Card.Title className="blog-title">{blog.heading}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                By {blog.author}
              </Card.Subtitle>
              <Card.Text className="blog-description">
                {blog.description}
              </Card.Text>
              <div className="text-muted small mt-2">
                Created:
                {new Date(
                  blog.createdAt || new Date()
                ).toLocaleDateString()}{" "}
                Updated:
                {new Date(blog.updatedAt || new Date()).toLocaleDateString()}
              </div>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setIdToDelete(blog._id!);
                  setShowDeleteModal(true);
                }}
                disabled={disabled}
                className="mt-2 "
                variant="danger"
                size="sm"
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default UserBlogs;
