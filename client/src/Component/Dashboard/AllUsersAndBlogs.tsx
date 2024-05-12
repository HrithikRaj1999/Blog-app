import { Container, Row, Col, Button } from "react-bootstrap";
import UserBlogs from "./UserBlogs";
import DeleteConfirmation from "../Blog/DeleteConfirmation";
import BlogModal from "../Blog/BlogModal";
import useAllUsersAndBlog from "../../hooks/Blog/useAllUsersAndBlog";
const AllUsersAndBlogs = () => {
  const {
    users,
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
  } = useAllUsersAndBlog();

  return (
    <div>
      <Container>
        <h1 className="mb-5 text-center">User Details and Blogs related to them</h1>
        
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
