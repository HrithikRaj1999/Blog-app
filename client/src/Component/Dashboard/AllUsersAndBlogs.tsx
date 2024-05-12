import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { fetchUsers } from "../../ReduxSlice/userSlice";
import { Container, Row, Col, Button } from "react-bootstrap";
import UserBlogs from "./UserBlogs";
import DeleteConfirmation from "../Blog/DeleteConfirmation";
import { deleteBlog } from "../../services/blogService";
import { toast } from "react-toastify";
import { changeUserRole } from "../../services/userService";
import { Blog } from "../../Types";
import BlogModal from "../Blog/BlogModal";
const AllUsersAndBlogs = () => {
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

  return (
    <div>
      <Container>
        <h1>User Details and Blogs related to them</h1>
        {users.map((user) => (
          <div key={user._id} className="user-container">
            <Row className="mb-3">
              <Col>
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
                <div className="d-flex align-items-center">
                  <p className="col-3 mb-0">Role: {user.role}</p>{" "}
                  <div className="col-3">
                    <select
                      value={selectedRole[user._id] || user.role}
                      disabled={loggenInUser?._id === user._id}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className="form-control"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="col-auto">
                    <Button
                      disabled={loggenInUser?._id === user._id}
                      onClick={() => submitRoleChange(user._id)}
                    >
                      Update Role
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            <UserBlogs
              handleView={handleView}
              disabled={loggenInUser?._id === user._id}
              userId={user._id}
              setIdToDelete={setIdToDelete}
              setShowDeleteModal={setShowDeleteModal}
            />
          </div>
        ))}
      </Container>
      <DeleteConfirmation
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        handleDelete={handleDelete}
      />
      <BlogModal
        show={showModal}
        onHide={() => setShowModal(false)}
        blog={viewedBlog}
      />
    </div>
  );
};

export default AllUsersAndBlogs;
