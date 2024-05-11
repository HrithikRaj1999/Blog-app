import { Container, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Dashboard = () => {
  const role = useSelector(
    (state: RootState) => state?.auth?.user?.role || "user"
  );
  return (
    <Container className="mt-5">
      <h1>Dashboard</h1>
      <ListGroup>
        {role === "admin" || role === "super-admin" ? (
          <>
            <ListGroup.Item action href="#show-users">
              Show All Users
            </ListGroup.Item>
            <ListGroup.Item action href="#delete-user-blog">
              Delete User Blog
            </ListGroup.Item>
            <ListGroup.Item action href="#make-user-admin">
              Make a User Admin
            </ListGroup.Item>
            <ListGroup.Item action href="#delete-user">
              Delete User
            </ListGroup.Item>
          </>
        ) : (
          <>
            <ListGroup.Item action href="#make-blog">
              Make Blog
            </ListGroup.Item>
            <ListGroup.Item action href="#edit-blog">
              Edit Blog
            </ListGroup.Item>
            <ListGroup.Item action href="#delete-blog">
              Delete Blog
            </ListGroup.Item>
          </>
        )}
      </ListGroup>
    </Container>
  );
};

export default Dashboard;
