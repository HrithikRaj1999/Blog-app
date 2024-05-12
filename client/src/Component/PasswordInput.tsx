import React, { FC, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { Eye, EyeOff } from "react-feather";

interface PasswordInputWithToggleProps {
  controlId: string;
  name: string;
  placeholder: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInputWithToggle: FC<PasswordInputWithToggleProps> = ({
  controlId,
  name,
  placeholder,
  value,
  handleChange,
}) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Form.Group controlId={controlId} className="mb-3">
      <Form.Label>{placeholder}</Form.Label>
      <InputGroup>
        <Form.Control
          type={passwordVisible ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required
        />
        <Button variant="outline-success" onClick={togglePasswordVisibility}>
          {passwordVisible ? (
            <EyeOff  size={18} />
          ) : (
            <Eye  size={18} />
          )}
        </Button>
      </InputGroup>
    </Form.Group>
  );
};

export default PasswordInputWithToggle;
