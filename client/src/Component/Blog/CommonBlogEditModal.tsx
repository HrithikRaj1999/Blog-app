import { Container, Button, Modal, Form } from "react-bootstrap";
import DisclaimerPage from "./DisclamerPage";
import { FormEvent } from "react";
import { Blog } from "../../Types";
interface CommonBlogEditModalPropsType {
  handleShow: () => void;
  show: boolean;
  title?: string;
  handleClose: () => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  blogData: Blog;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  errors: any;
}
export const CommonBlogEditModal = ({
  handleShow,
  title = "Update Blog",
  show,
  handleClose,
  handleSubmit,
  blogData,
  handleChange,
  errors,
}: CommonBlogEditModalPropsType) => {
  return (
    <div>
      <Container>
        <DisclaimerPage />
        <Modal show={show} onHide={handleClose}>
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="heading">
                <Form.Label>Heading</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter heading"
                  name="heading"
                  value={blogData.heading || ""}
                  onChange={handleChange}
                />
                {errors.heading && (
                  <Form.Text className="text-danger">
                    {errors.heading}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group controlId="author">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter author"
                  name="author"
                  value={blogData.author || ""}
                  onChange={handleChange}
                />
                {errors.author && (
                  <Form.Text className="text-danger">{errors.author}</Form.Text>
                )}
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter description"
                  name="description"
                  value={blogData.description || ""}
                  onChange={handleChange}
                />
                {errors.description && (
                  <Form.Text className="text-danger">
                    {errors.description}
                  </Form.Text>
                )}
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Button variant="primary" onClick={handleShow}>
          Create Blog
        </Button>
      </Container>
    </div>
  );
};
