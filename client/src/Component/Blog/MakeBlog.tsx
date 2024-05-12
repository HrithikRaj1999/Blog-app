import React, { FormEvent, useState } from "react";
import { Blog } from "../../Types";
import { validateBlogForm } from "../../helper/util";
import { useDispatch } from "react-redux";
import { createBlog } from "../../services/blogService";
import { useNavigate } from "react-router-dom";
import { CommonBlogEditModal } from "./CommonBlogEditModal";

const MakeBlogPage = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [blogData, setBlogData] = useState<Partial<Blog>>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!blogData) return;
      if (!validateBlogForm(blogData, setErrors)) return;
      await dispatch(createBlog(blogData) as any);
      navigate("/secure/dashboard/show-own-blog");
    } catch (error) {
      console.log(error);
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

export default MakeBlogPage;
