import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
const Userdashboard = () => {
  return (
    <>
      <ListGroup.Item action as={Link} to="/secure/dashboard/user/create-blog">
        Make Blog
      </ListGroup.Item>
      <ListGroup.Item action as={Link} to="/secure/dashboard/user/show-own-blog">
        Show Own Blog
      </ListGroup.Item>
    </>
  );
};

export default Userdashboard;
