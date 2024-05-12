import ResponsiveNavbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="main-layout">
      <ResponsiveNavbar />
      <div className="outlet-container ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
