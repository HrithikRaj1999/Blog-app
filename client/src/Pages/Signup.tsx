import { FormEvent, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { proceedSignup } from "../helper/util";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../services/authService";
import PasswordInputWithToggle from "../Component/PasswordInput";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    const { name, email, password } = formData;
    if (!proceedSignup({ name, email, password, setError })) return;

    try {
      await dispatch(
        authenticateUser({ name, email, password }, "signup") as any
      );
      navigate("/login");
      toast.success("Signup successful");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? error);
      setError("Signup failed. Please check your details and try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-50" style={{ minWidth: "350px" }}>
        <Row>
          <Col md={12} className="border p-4 bg-light rounded">
            <h2 className="mb-4 text-center">Signup</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSignup}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name" // Name attribute used here
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email" // Name attribute used here
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <PasswordInputWithToggle
                controlId="formPassword"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                handleChange={handleChange}
              />

              <h6 className="mb-3">
                Have an account? <Link to="/login">Login</Link>
              </h6>

              <Button variant="primary" type="submit" className="w-100">
                Sign Up
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default SignupPage;
