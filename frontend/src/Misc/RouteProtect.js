import { Navigate, Outlet } from "react-router-dom";
import { userIsLoggedIn } from "./Helpers";

export function UserOnlyRoute() {
    if (!userIsLoggedIn()) {
      return <Navigate to={'/login'} replace />;
    }
    return <Outlet />;
}
  
export function VisitorOnlyRoute() {
    if (userIsLoggedIn()) {
      return <Navigate to={'/'} replace />;
    }
    return <Outlet />;
}