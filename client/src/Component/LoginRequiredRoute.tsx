import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function LoginRequiredRoute() {
  const user = { isLoggedIn: "true" };
  const location = useLocation();
  if (!user || !user.isLoggedIn) {
    // Redirect them to the login page, but save the current location they were trying to go to
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
