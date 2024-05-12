import { FormEvent, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { proceedLogin } from "../helper/util";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../services/authService";
import PasswordInputWithToggle from "../Component/PasswordInput";
import { AppDispatch } from "../store/store";
import { fetchBlogs } from "../ReduxSlice/blogSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogDispath = useDispatch<AppDispatch>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!proceedLogin({ setError, email, password })) return;

    try {
      await dispatch(authenticateUser({ email, password }, "login") as any);
      await blogDispath(fetchBlogs());
      navigate("/");
      toast.success("Authentication successful");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? error);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-50" style={{ minWidth: "350px" }}>
        <Row>
          <Col md={12} className="border p-4 bg-light rounded">
            <h2 className="mb-4 text-center">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email" // Identifies the field name
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

              <Button variant="link" className="p-0 mb-2">
                Forgot Password?
              </Button>
              <h6 className="mb-5">
                Don't have an account? <Link to={"/signup"}>Sign up</Link>
              </h6>
              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default LoginPage;
