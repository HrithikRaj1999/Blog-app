import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../store/store";

export default function LoginRequiredRoute() {
  const userData = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  if (!userData.isLoggedIn || !userData.user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
