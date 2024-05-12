import { SetStateAction } from "react";
import { Blog } from "../Types";

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
export const validateBlogForm = (
  blogData: Partial<Blog>,
  setErrors: React.Dispatch<SetStateAction<Partial<Blog>>>
) => {
  if (!blogData) {
    return false;
  }

  const newErrors: { [key: string]: string } = {};
  let isValid = true;

  // Validate heading
  if (!blogData.heading || blogData.heading.trim() === "") {
    newErrors.heading = "Heading cannot be empty";
    isValid = false;
  }

  // Validate author
  if (!blogData.author || blogData.author.trim() === "") {
    newErrors.author = "Author cannot be empty";
    isValid = false;
  }

  // Validate description length
  if (blogData.description && blogData.description.length > 1000000) {
    newErrors.description = "Description cannot exceed 100,0000 characters";
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};
