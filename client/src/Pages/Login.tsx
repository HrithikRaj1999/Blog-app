import { FormEvent, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { proceedLogin } from "../helper/util";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../services/authService";
import PasswordInputWithToggle from "../Component/PasswordInput";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!proceedLogin({ setError, email, password })) return;
    try {
      await dispatch(authenticateUser({ email, password }, "login") as any);
      navigate("/");
    } catch {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 w">
      <div className="w-50">
        <Row>
          <Col md={12} className="border p-4 bg-light rounded">
            <h2 className="mb-4 text-center">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <PasswordInputWithToggle
                password={password}
                setPassword={setPassword}
              />
              <Button variant="link" className="p-0 mb-2">
                Forget Password?
              </Button>
              <h6 className="mb-5">
                Dont have an account? <Link to={"/signup"}> Sign up </Link>
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
