import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useFetch from "../hooks/useFetch";
import { base_url } from "../constants/constants";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loadUser = async () => {
        setLoading(true);
        const token = localStorage.getItem("authToken");

        // If there's no token, skip the request.
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${base_url}/auth/me`, {
                method: "POST", // Change to GET if your API expects a GET request
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                // Unauthorized or other error responses:
                localStorage.removeItem("authToken");
                setIsAuthenticated(false);
                toast.error("Session expired or user not authenticated.");
                return false;
            }

            const data = await response.json();

            if (data && data.data) {
                setUser(data.data);
                setIsAuthenticated(true);

                const redirectUrl = localStorage.getItem("redirectUrl") || "/";

                navigate(redirectUrl, { replace: true });
                return true;
            } else {
                toast.error("Unexpected response format.");
                return false;
            }
        } catch (error) {
            console.error("Load user error", error);
            toast.error("Error loading user.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const login = async (userData) => {
        setLoading(true);
        try {
            const response = await fetch(`${base_url}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                // Provide a fallback error message if data.error isn't defined.
                toast.error(data.error || "Login failed. Please try again.");
                return false;
            }

            if (!data.token) {
                toast.error("Invalid Login. Missing Token.");
                return false;
            }

            setUser(data.data);
            localStorage.setItem("authToken", data.token);
            setIsAuthenticated(true);
            return true;
        } catch (err) {
            console.error("Error during login:", err);
            toast.error("An unexpected error occurred during login.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem("authToken");
            navigate("/");
        } catch (error) {
            console.log("Logout error", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <DataContext.Provider
            value={{ user, loading, isAuthenticated, login, logout }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
