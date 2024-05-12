import React, { useState } from "react";
import { Button, Modal, Form, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { EditProfileForm, User } from "../../Types";
import PasswordInputWithToggle from "../PasswordInput";
import { validateEditUserForm } from "../../helper/util";

const EditProfile = () => {
  const userData = useSelector((state: RootState) => state.auth.user);
  const [formData, setFormData] = useState<EditProfileForm>({
    name: userData?.name ?? "",
    email: userData?.email ?? "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Unified input handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEditUserForm(formData, setErrors)) {
      handleClose();
    }
  };

  return (
    <Container>
      <Button variant="primary" onClick={handleShow}>
        Edit User
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <Form.Text className="text-danger">{errors.name}</Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              )}
            </Form.Group>

            <PasswordInputWithToggle
              controlId="formPassword"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              handleChange={handleChange}
            />
            {errors.password && (
              <Form.Text className="text-danger">{errors.password}</Form.Text>
            )}
            <PasswordInputWithToggle
              controlId="formConfirmPassword"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              handleChange={handleChange}
            />
            {errors.confirmPassword && (
              <Form.Text className="text-danger">
                {errors.confirmPassword}
              </Form.Text>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default EditProfile;
