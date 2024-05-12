import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { proceedSignup } from "../../helper/util";
import { authenticateUser } from "../../services/authService";
import { toast } from "react-toastify";

const useSignin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    const { name, email, password } = formData;
    if (!proceedSignup({ name, email, password, setError })) return;

    try {
      await dispatch(
        authenticateUser({ name, email, password }, "signup") as any
      );
      navigate("/login");
      toast.success("Signup successful");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? error);
      setError("Signup failed. Please check your details and try again.");
    }
  };
  return { formData, error, handleChange, handleSignup };
};

export default useSignin;
