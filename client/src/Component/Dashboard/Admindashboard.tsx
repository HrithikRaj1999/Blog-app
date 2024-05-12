import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
const Admindashboard = () => {
  return (
    <>
      <ListGroup>
        <ListGroup.Item action as={Link} to="/show-users">
          Show All Users
        </ListGroup.Item>
        <ListGroup.Item action as={Link} to="/delete-user-blog">
          Delete User Blog
        </ListGroup.Item>
        <ListGroup.Item action as={Link} to="/make-user-admin">
          Make a User Admin
        </ListGroup.Item>
        <ListGroup.Item action as={Link} to="/delete-user">
          Delete User
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default Admindashboard;
