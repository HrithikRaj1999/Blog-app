import { FormEvent, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { proceedSignup } from "../helper/util";
import { Link } from "react-router-dom";
import { authenticateUser } from "../services/authService";
import { useDispatch } from "react-redux";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    if (!proceedSignup({ name, email, password, setError })) return;
    dispatch(authenticateUser({ email, password }, "signup") as any);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-50">
        <Row>
          <Col md={12} className="border p-4 bg-light rounded">
            <h2 className="mb-4 text-center">Signup</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSignup}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

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

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <h6 className="mb-3">
                Have an account? <Link to={"/login"}> Login </Link>
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
