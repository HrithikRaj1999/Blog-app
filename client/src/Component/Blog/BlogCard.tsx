import { Button, Card, Col } from "react-bootstrap";
import { Blog } from "../../Types";
import DeleteConfirmation from "./DeleteConfirmation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../../services/blogService";
import { toast } from "react-toastify";

const BlogCard = ({
  blog,
  writable = false,
  handleEdit = () => null,
}: {
  blog: Blog;
  writable?: boolean;
  handleEdit?: (initData: Blog) => void;
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      await dispatch(deleteBlog(blog._id!) as any);
      toast.success("Deleted Successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "An error occurred");
    } finally {
      setShowDeleteModal(false);
    }
  };
  const onDelete = () => {
    setShowDeleteModal(true);
  };

  return (
    <>
      <Col xs={12} sm={12} md={6} lg={4} xl={3} className="mb-3">
        <Card className="blog-card" style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title className="blog-title">{blog.heading}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              By {blog.author}
            </Card.Subtitle>
            <Card.Text className="blog-description">
              {blog.description}
              <div className="text-muted small mt-2">
                Created:{" "}
                {new Date(blog.createdAt || new Date()).toLocaleDateString()} |
                Updated:{" "}
                {new Date(blog.updatedAt || new Date()).toLocaleDateString()}
              </div>
            </Card.Text>
            {writable && (
              <div className="d-flex justify-content-between">
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(blog)}
                >
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={onDelete}>
                  Delete
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
      <DeleteConfirmation
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default BlogCard;
