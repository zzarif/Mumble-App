import { Outlet, Navigate } from "react-router-dom";
import { urls } from "../../constants/urls";

function PrivateRoutes() {
  return localStorage.getItem("coobiz") ? <Outlet /> : <Navigate to={urls.LANDING_PAGE} />;
}

export default PrivateRoutes;
