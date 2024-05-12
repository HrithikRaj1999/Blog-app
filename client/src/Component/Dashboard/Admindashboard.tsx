import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
const Admindashboard = () => {
  return (
    <>
      <ListGroup>
        <ListGroup.Item action as={Link} to="admin/expose-all">
          Show All Users and there blogs
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default Admindashboard;
