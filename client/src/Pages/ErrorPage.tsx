import { Container, Row, Col, Button } from "react-bootstrap";

const ErrorPage = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col className="text-center">
          <h1 className="mb-4">Oops!</h1>
          <p className="mb-4">Something went wrong. Please try again later.</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
