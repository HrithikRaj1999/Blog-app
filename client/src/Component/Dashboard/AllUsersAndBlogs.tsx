import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { fetchUsers } from "../../ReduxSlice/userSlice";
import { Container, Row, Col } from "react-bootstrap";
import UserBlogs from "./UserBlogs";
import DeleteConfirmation from "../Blog/DeleteConfirmation";
import { deleteBlog } from "../../services/blogService";
import { toast } from "react-toastify";
const AllUsersAndBlogs = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector(
    (state: RootState) => state.users
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const handleDelete = async () => {
    try {
      await dispatch(deleteBlog(idToDelete) as any);
      toast.success("Deleted Successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "An error occurred");
    } finally {
      setShowDeleteModal(false);
    }
  };
  useEffect(() => {
    dispatch(fetchUsers() as any);
  }, []);

  return (
    <div>
      <Container>
        {users.map((user) => (
          <div key={user._id}>
            <Row className="mb-3">
              <Col>
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
              </Col>
            </Row>
            <UserBlogs
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
    </div>
  );
};

export default AllUsersAndBlogs;
