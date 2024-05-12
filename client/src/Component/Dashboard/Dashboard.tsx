import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import DashboardMenu from "./DashboardMenu";

const Dashboard = () => {
  return (
    <Row style={{ marginLeft: "15px" }}>
      <Col xs={12} md={3}>
        <DashboardMenu />
      </Col>
      <Col xs={12} md={9}>
        <Outlet />
      </Col>
    </Row>
  );
};

export default Dashboard;
