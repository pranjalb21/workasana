import { Navigate, Outlet } from "react-router-dom";
import { useData } from "../contexts/application.context";

const ProtectedRoute = () => {
    const {isAuthenticated} = useData()
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
