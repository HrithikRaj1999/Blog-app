import React from "react";
import { Container } from "react-bootstrap";

const DisclaimerPage = () => {
  return (
    <Container className=" mt-5">
      <h2>Disclaimer</h2>
      <p>
        By using this website and its services, you agree to the following terms
        and conditions:
      </p>
      <ul>
        <li>
          The content you create must not contain offensive, harmful, or
          inappropriate material.
        </li>
        <li>
          All content is subject to surveillance by the site administrators.
        </li>
        <li>
          The site administrators reserve the right to delete or modify any
          content that violates the terms of service.
        </li>
        <li>
          We do not guarantee the accuracy, completeness, or reliability of
          user-generated content.
        </li>
        <li>
          Users are solely responsible for the content they create and share on
          this platform.
        </li>
      </ul>
    </Container>
  );
};

export default DisclaimerPage;
