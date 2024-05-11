import ResponsiveNavbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <ResponsiveNavbar />
      <Outlet />
    </div>
  );
};

export default Layout;