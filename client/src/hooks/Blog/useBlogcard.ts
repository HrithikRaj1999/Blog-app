import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../../services/blogService";
import { Blog } from "../../Types";
import { toast } from "react-toastify";

const useBlogcard = (blog: Blog, handleView: (blog: Blog) => void) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteBlog(blog._id!) as any);
      toast.success("Deleted Successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "An error occurred");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const onDelete = () => {
    setShowDeleteModal(true);
  };

  const onView = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    handleView(blog);
  };
  return {
    showDeleteModal,
    handleDelete,
    onDelete,
    onView,
    setShowDeleteModal,
  };
};

export default useBlogcard;
