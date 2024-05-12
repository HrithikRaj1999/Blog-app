import React, { FormEvent, useState } from "react";
import { CommonBlogEditModal } from "./CommonBlogEditModal";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { validateBlogForm } from "../../helper/util";
import { updateBlog } from "../../services/blogService";
import { Blog } from "../../Types";
import { toast } from "react-toastify";

const EditBlog = () => {
  const location = useLocation();
  const initData = location.state;
  const [show, setShow] = useState(true);
  const handleClose = () => {
    navigate("/secure/dashboard/show-own-blog");
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();
  const [blogData, setBlogData] = useState<Partial<Blog>>(initData);
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!blogData) return;
      if (!validateBlogForm(blogData, setErrors)) return;
      await dispatch(updateBlog(blogData._id!, blogData) as any);
      navigate("/secure/dashboard/show-own-blog");
      toast.success("Update success");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? error);
    }
    handleClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (blogData) {
      setBlogData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <CommonBlogEditModal
      {...{
        handleShow,
        show,
        handleClose,
        handleSubmit,
        blogData,
        handleChange,
        errors,
      }}
    />
  );
};

export default EditBlog;
