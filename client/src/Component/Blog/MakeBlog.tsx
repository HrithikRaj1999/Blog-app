import React, { FormEvent, useState } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { Blog } from "../../Types";
import { validateBlogForm } from "../../helper/util";
import DisclaimerPage from "./DisclamerPage";
import { useDispatch } from "react-redux";
import { createBlog } from "../../services/blogService";
import { useNavigate } from "react-router-dom";

const MakeBlogPage = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [blogData, setBlogData] = useState<Partial<Blog>>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!blogData) return;
    if (!validateBlogForm(blogData, setErrors)) return;
    console.log({ errors, blogData });
    try {
      await dispatch(createBlog(blogData) as any);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (blogData) {
      setBlogData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <Container>
      <Button variant="primary" onClick={handleShow}>
        Create Blog
      </Button>
      <DisclaimerPage />
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Create Blog</Modal.Title>
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
                <Form.Text className="text-danger">{errors.heading}</Form.Text>
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
    </Container>
  );
};

export default MakeBlogPage;
