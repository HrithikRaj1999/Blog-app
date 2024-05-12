import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { AppDispatch } from "../../store/store";
import { proceedLogin } from "../../helper/util";
import { authenticateUser } from "../../services/authService";
import { fetchBlogs } from "../../ReduxSlice/blogSlice";
const useLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogDispath = useDispatch<AppDispatch>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!proceedLogin({ setError, email, password })) return;

    try {
      await dispatch(authenticateUser({ email, password }, "login") as any);
      await blogDispath(fetchBlogs());
      navigate("/");
      toast.success("Authentication successful");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? error);
      setError("Login failed. Please check your credentials and try again.");
    }
  };
  return { error, handleLogin, formData, handleChange };
};

export default useLogin;
