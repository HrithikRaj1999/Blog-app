import { SetStateAction } from "react";

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isStrongPassword = (password: string) => {
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return passwordRegex.test(password);
};
export const proceedSignup = ({
  name,
  email,
  password,
  setError,
}: {
  name: string;
  email: string;
  password: string;
  setError: React.Dispatch<SetStateAction<string>>;
}) => {
  setError("");
  if (!name.trim()) {
    setError("Name cannot be empty");
    return false;
  }
  if (!isValidEmail(email)) {
    setError("Invalid email address");
    return false;
  }
  if (!isStrongPassword(password)) {
    setError(
      "Password must be at least 8 characters long, contain at least one number, one special character, and both upper and lower case letters."
    );
    return false;
  }
  return true;
};
export const proceedLogin = ({
  setError,
  email,
  password,
}: {
  email: string;
  password: string;
  setError: React.Dispatch<SetStateAction<string>>;
}) => {
  setError("");

  // Simple validations
  if (!isValidEmail(email)) {
    setError("Invalid email address");
    return false;
  }

  if (!password.trim()) {
    setError("Password cannot be empty");
    return false;
  }
  return true;
};
