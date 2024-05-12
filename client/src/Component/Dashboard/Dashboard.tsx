import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import DashboardMenu from "./DashboardMenu";

const Dashboard = () => {
  return (
    <div style={{ height: "100vh" }} className="mt-5">
      <Row style={{ height: "100%", marginLeft: "15px" }}>
        <Col md={3}>
          <DashboardMenu />
        </Col>
        <Col md={9} className="mt-5">
          <Outlet />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
