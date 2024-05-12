import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
const Userdashboard = () => {
  return (
    <>
      <ListGroup.Item action as={Link} to="/secure/dashboard/create-blog">
        Make Blog
      </ListGroup.Item>
      <ListGroup.Item action as={Link} to="/secure/dashboard/show-own-blog">
        Show Own Blog
      </ListGroup.Item>
      <ListGroup.Item action as={Link} to="/edit-blog">
        Edit Blog
      </ListGroup.Item>
      <ListGroup.Item action as={Link} to="/delete-blog">
        Delete Blog
      </ListGroup.Item>
    </>
  );
};

export default Userdashboard;
