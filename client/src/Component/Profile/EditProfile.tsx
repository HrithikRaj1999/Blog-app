// EditProfile.tsx
import React, { useState } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { EditProfileForm } from "../../Types";
import PasswordInputWithToggle from "../PasswordInput";
import { validateEditUserForm } from "../../helper/util";
import { updateUserProfile } from "../../services/userService";
import { toast } from "react-toastify";

const EditProfile = () => {
  const userData = useSelector((state: RootState) => state.auth.user);

  const [formData, setFormData] = useState<EditProfileForm>({
    name: userData?.name ?? "",
    email: userData?.email ?? "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch();

  // Unified input handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEditUserForm(formData, setErrors)) {
      try {
        await dispatch(updateUserProfile(userData?._id!, formData) as any);
        toast.success("User Updated");
      } catch (error: any) {
        toast.error(error?.response?.data?.message ?? error);
        console.error("Failed to update profile", error);
      }
    }
  };

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit}>
        <Alert variant="info">
          Please update your details and click 'Save Changes'.
        </Alert>
        <Form.Group controlId="name" className="mb-3">
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
        <Form.Group controlId="email" className="mb-3">
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

        <div className="d-flex justify-content-between mt-3">
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditProfile;
