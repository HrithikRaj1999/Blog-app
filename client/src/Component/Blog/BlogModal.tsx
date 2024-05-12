// BlogModal.tsx
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Blog } from "../../Types";

interface BlogModalProps {
  show: boolean;
  onHide: () => void;
  blog: Blog | null;
}

const BlogModal: React.FC<BlogModalProps> = ({ show, onHide, blog }) => {
  if (!blog) return null;

  return (
    <Modal size={"lg"} show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{blog.heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="blog-author mb-2 text-muted">By {blog.author}</div>
        <div className="blog-content mb-4">{blog.description}</div>
        <div className="text-muted small mt-2">
          Created: {new Date(blog.createdAt || new Date()).toLocaleDateString()}{" "}
          | Updated:
          {new Date(blog.updatedAt || new Date()).toLocaleDateString()}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BlogModal;
