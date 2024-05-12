import React, { FC, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { Eye, EyeOff } from "react-feather";

interface PasswordInputWithToggleProps {
  password: string;
  setPassword: (password: string) => void;
}

const PasswordInputWithToggle: FC<PasswordInputWithToggleProps> = ({
  password,
  setPassword,
}) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Form.Group controlId="formPassword" className="mb-3">
      <Form.Label>Password</Form.Label>
      <InputGroup>
        <Form.Control
          type={passwordVisible ? "text" : "password"}
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button variant="outline-primary" onClick={togglePasswordVisibility}>
          {passwordVisible ? (
            <EyeOff color="black" size={20} />
          ) : (
            <Eye color="black" size={20} />
          )}
        </Button>
      </InputGroup>
    </Form.Group>
  );
};

export default PasswordInputWithToggle;
