import { Container, Row, Col } from 'react-bootstrap';

const AboutPage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>About Our Blog Application</h2>
          <p>Welcome to our blog application!</p>
          <p>Here, you can express your thoughts, share your experiences, and connect with others through the power of blogging.</p>
          <h3>Features:</h3>
          <ul>
            <li>Create and publish your own blog posts.</li>
            <li>Upload images and multimedia content to enhance your posts.</li>
            <li>Customize your blog with themes and layouts.</li>
            <li>Engage with other users through comments and likes.</li>
          </ul>
          <h3>Why Choose Us?</h3>
          <p>Our blog application is designed with simplicity and functionality in mind. Whether you're a seasoned blogger or just starting out, our platform offers the tools you need to craft compelling content and build a community around your ideas.</p>
          <p>We prioritize user experience and strive to provide a seamless blogging experience for everyone.</p>
          <h3>Contact Us:</h3>
          <p>If you have any questions, suggestions, or feedback, please don't hesitate to reach out to us at <a href="mailto:contact@example.com">contact@example.com</a>.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutPage;
