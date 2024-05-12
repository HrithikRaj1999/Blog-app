import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";
import { deleteBlog } from "../../services/blogService";
import { toast } from "react-toastify";
import { changeUserRole } from "../../services/userService";
import { Blog } from "../../Types";

export default function useAllUsersAndBlog() {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector(
    (state: RootState) => state.users
  );
  const loggenInUser = useSelector((state: RootState) => state.auth.user);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [selectedRole, setSelectedRole] = useState<Record<string, string>>({});
  const [viewedBlog, setViewedBlog] = useState<Blog | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleView = (blog: Blog) => {
    setViewedBlog(blog);
    setShowModal(true);
  };
  const handleRoleChange = (userId: string, newRole: string) => {
    setSelectedRole({ ...selectedRole, [userId]: newRole });
  };
  const submitRoleChange = async (id: string) => {
    try {
      console.log({ id, rtole: selectedRole[id] });
      await dispatch(changeUserRole(id, selectedRole[id]) as any);
      toast.success("User Role Changed Successfully");
    } catch (error: any) {
      toast.error(error.response.data.message ?? error);
    }
  };
  const handleDelete = async () => {
    try {
      await dispatch(deleteBlog(idToDelete) as any);
      toast.success("Deleted Successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "An error occurred");
    } finally {
      setShowDeleteModal(false);
      setIdToDelete("");
    }
  };
  return {
    users,
    status,
    error,
    loggenInUser,
    showDeleteModal,
    viewedBlog,
    showModal,
    handleView,
    handleRoleChange,
    submitRoleChange,
    handleDelete,
    setShowDeleteModal,
    setIdToDelete,
    selectedRole,
    setShowModal,
    setSelectedRole,
  };
}
