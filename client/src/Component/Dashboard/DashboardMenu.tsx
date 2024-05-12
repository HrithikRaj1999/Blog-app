import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Admindashboard from "./Admindashboard";
import Userdashboard from "./Userdashboard";
import { Link } from "react-router-dom";
const DashboardMenu = () => {
  const role = useSelector(
    (state: RootState) => state?.auth?.user?.role || "user"
  );
  return (
    <div>
      <h1>Dashboard</h1>
      <ListGroup>
        <ListGroup.Item as={Link} to="edit-profile" action>
          Edit profile
        </ListGroup.Item>
        {role === "admin" || role === "super-admin" ? (
          <Admindashboard />
        ) : (
          <Userdashboard />
        )}
      </ListGroup>
    </div>
  );
};

export default DashboardMenu;
