import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    return localStorage.getItem("accessToken") ? (
        <Navigate to="/" />
    ) : (
        <Outlet />
    );
};

export default PublicRoute;
