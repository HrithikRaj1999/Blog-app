import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import PasswordInputWithToggle from "../Component/PasswordInput";
import useLogin from "../hooks/Auth/useLogin";

const LoginPage = () => {
  const { error, handleLogin, formData, handleChange } = useLogin();
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
