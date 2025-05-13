import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useData } from "../contexts/Application.context";

const ProtectedRoute = () => {
    const { isAuthenticated } = useData();
    const location = useLocation();

    if (!isAuthenticated) {
        localStorage.setItem(
            "redirectUrl",
            location.pathname + location.search
        );
        // console.log(location.pathname, "patg", location.search);

        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
