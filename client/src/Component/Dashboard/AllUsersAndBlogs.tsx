import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
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
    <Container className="my-5">
      <h1 className="mb-5 text-center">
        User Details and Blogs Related to Them
      </h1>

      {users.map((user) => (
        <Card key={user._id} className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="align-items-center mb-3">
              <Col md={8}>
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <div className="d-flex align-items-center mb-2">
                  <p className="me-2 mb-0">Role:</p>
                  <Form.Select
                    size="sm"
                    value={selectedRole[user._id] || user.role}
                    disabled={loggenInUser?._id === user._id}
                    onChange={(e) =>
                      handleRoleChange(user._id, e.target.value)
                    }
                    style={{ width: '150px' }}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                  <Button
                    className="ms-2"
                    size="sm"
                    disabled={loggenInUser?._id === user._id}
                    onClick={() => submitRoleChange(user._id)}
                  >
                    Update Role
                  </Button>
                </div>
              </Col>
            </Row>
            <hr />
            <h6>Blogs:</h6>
            <UserBlogs
              handleView={handleView}
              disabled={loggenInUser?._id === user._id}
              userId={user._id}
              setIdToDelete={setIdToDelete}
              setShowDeleteModal={setShowDeleteModal}
            />
          </Card.Body>
        </Card>
      ))}

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
    </Container>
  );
};

export default AllUsersAndBlogs;
