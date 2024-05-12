import { Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { SetStateAction } from "react";

const UserBlogs = ({
  userId,
  disabled = false,
  setIdToDelete,
  setShowDeleteModal,
}: {
  userId: string;
  disabled: boolean;
  setIdToDelete: React.Dispatch<SetStateAction<string>>;
  setShowDeleteModal: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const blogs = useSelector((state: RootState) => state.blogs.blogs).filter(
    (blog) => blog.createdBy === userId
  );

  return (
    <Row>
      {blogs.map((blog) => (
        <Col xs={12} sm={12} md={6} lg={4} xl={3} className="mb-3">
          <Card className="blog-card" style={{ width: "100%" }}>
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
                onClick={() => {
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
