import { Button, Card, Col } from "react-bootstrap";
import { Blog } from "../../Types";
import DeleteConfirmation from "./DeleteConfirmation";
import useBlogcard from "../../hooks/Blog/useBlogcard";

interface BlogCardProps {
  blog: Blog;
  writable?: boolean;
  handleEdit?: (initData: Blog) => void;
  handleView?: (blog: Blog) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  blog,
  writable = false,
  handleEdit = () => null,
  handleView = () => null,
}) => {
  const {
    showDeleteModal,
    handleDelete,
    onDelete,
    onView,
    setShowDeleteModal,
  } = useBlogcard(blog, handleView);

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleEdit(blog);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <>
      <Col
        xs={12}
        sm={12}
        md={8}
        lg={12}
        className="mb-4 p-2"
        style={{ cursor: "pointer" }}
      >
        <Card className="blog-card" style={{ width: "100%" }} onClick={onView}>
          <Card.Body>
            <Card.Title className="blog-title">{blog.heading}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted blog-author">
              By {blog.author}
            </Card.Subtitle>
            <Card.Text className="blog-description">
              {blog.description}
            </Card.Text>
            <div className="text-muted small mt-2">
              Created:{" "}
              {new Date(blog.createdAt || new Date()).toLocaleDateString()} |
              Updated:{" "}
              {new Date(blog.updatedAt || new Date()).toLocaleDateString()}
            </div>
            {writable && (
              <div className="d-flex justify-content-between">
                <Button variant="warning" size="sm" onClick={handleEditClick}>
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={handleDeleteClick}>
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
