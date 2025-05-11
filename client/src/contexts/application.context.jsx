import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useFetch from "../hooks/useFetch";
import { base_url } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import { getHeader } from "../auth/addHeader";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState(null);
    const [projects, setProjects] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [tags, setTags] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [teams, setTeams] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

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

    const loadUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${base_url}/auth`, {
                headers: getHeader(),
            });
            if (!response.ok) {
                toast.error("Something went wrong.");
            }
            const data = await response.json();
            setUsers(data.data);
        } catch (error) {
            console.log("Error while loading users", error);
            toast.error("Something went wrong. Please try again.");
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

    const signup = async (userData) => {
        setLoading(true);
        try {
            const response = await fetch(`${base_url}/auth/signup`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.error);
                if (data.errors) {
                    data.errors.foreach((error) => toast.error(error));
                }
            } else {
                localStorage.setItem("authToken", data.token);
                toast.success(data.message);
                toast.info("Logged in successfully.");
                setUser(data.data);
                setIsAuthenticated(true);
                navigate("/", { replace: true });
            }
        } catch (error) {
            console.log("Signup error", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const addProject = async (projectData) => {
        setLoading(true);
        try {
            const response = await fetch(`${base_url}/projects`, {
                method: "POST",
                headers: getHeader(),
                body: JSON.stringify(projectData),
            });
            const data = await response.json();
            // console.log(data);

            if (!response.ok) {
                toast.error(data.error);
                if (data.errors) {
                    data.errors.foreach((error) => toast.error(error));
                }
            } else {
                setProjects((prev) => [...prev, data.data]);
                toast.success(data.message);
                return true;
            }
        } catch (error) {
            console.log("Error occured while adding project.", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const loadProjects = async (url) => {
        setLoading(true);
        try {
            const response = await fetch(url, {
                headers: getHeader(),
            });
            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error);
                if (data.errors) {
                    data.errors.foreach((error) => toast.error(error));
                }
            } else {
                setProjects(data.data);
                // return true;
            }
        } catch (error) {
            console.log("Error occured while loading projects.", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    const loadProject = async (projectId) => {
        setLoading(true);
        try {
            const response = await fetch(
                `${base_url}/projects/project-id/${projectId}`,
                {
                    headers: getHeader(),
                }
            );
            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error);
                if (data.errors) {
                    data.errors.foreach((error) => toast.error(error));
                }
                return false;
            } else {
                return data.data;
            }
        } catch (error) {
            console.log("Error occured while loading project.", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const addTeam = async (teamData) => {
        setLoading(true);
        try {
            const response = await fetch(`${base_url}/teams`, {
                headers: getHeader(),
                method: "POST",
                body: JSON.stringify(teamData),
            });
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.error);
                if (data.errors) {
                    data.errors.foreach((error) => toast.error(error));
                }
            } else {
                setTeams((prev) => [...prev, data.data]);
                toast.success(data.message);
                return true;
            }
        } catch (error) {
            console.log("Error occured while adding team.", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const loadTeams = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${base_url}/teams`, {
                headers: getHeader(),
            });
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.error);
                if (data.errors) {
                    data.errors.foreach((error) => toast.error(error));
                }
            } else {
                setTeams(data.data);
            }
        } catch (error) {
            console.log("Error occured while loading team.", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getTeamByName = async (teamName) => {
        setLoading(true);
        try {
            const response = await fetch(
                `${base_url}/teams/team-name?teamName=${teamName}`,
                {
                    headers: getHeader(),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.error);
                if (data.errors) {
                    data.errors.foreach((error) => toast.error(error));
                }
                return false;
            } else {
                return data.data;
            }
        } catch (error) {
            console.log("Error occured while fetching team.", error);
            toast.error("Something went wrong. Please try again.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateTeam = async (teamName, teamData) => {
        setLoading(true);
        try {
            const response = await fetch(
                `${base_url}/teams?teamName=${teamName}`,
                {
                    headers: getHeader(),
                    method: "PUT",
                    body: JSON.stringify(teamData),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.error);
                if (data.errors) {
                    data.errors.foreach((error) => toast.error(error));
                }
                return false;
            } else {
                toast.success("Team updated successfully.");
                return data.data;
            }
        } catch (error) {
            console.log("Error occured while adding team.", error);
            toast.error("Something went wrong. Please try again.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const loadTags = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${base_url}/tags`, {
                headers: getHeader(),
            });
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.error);
                if (data.errors) {
                    data.errors.foreach((error) => toast.error(error));
                }
            } else {
                setTags(data.data);
            }
        } catch (error) {
            console.log("Error occured while fetching tags.", error);
            toast.error("Something went wrong. Please try again.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const addTag = async (tagData) => {
        setLoading(true);
        try {
            const response = await fetch(`${base_url}/tags`, {
                headers: getHeader(),
                method: "POST",
                body: JSON.stringify(tagData),
            });
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.error);
                if (data.errors) {
                    data.errors.foreach((error) => toast.error(error));
                }
            } else {
                setTags(data.data);
            }
        } catch (error) {
            console.log("Error occured while adding tags.", error);
            toast.error("Something went wrong. Please try again.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (taskData) => {
        setLoading(true);
        try {
            const response = await fetch(`${base_url}/tasks`, {
                method: "POST",
                headers: getHeader(),
                body: JSON.stringify(taskData),
            });
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.error);
                if (data.errors) {
                    data.errors.foreach((error) => toast.error(error));
                }
            } else {
                toast.success("Task added successfully.");
                setTasks((prev) => [...prev, data.data]);
                return true;
            }
        } catch (error) {
            console.log("Error occured while adding task.", error.message);
            toast.error("Something went wrong. Please try again.");
            return false;
        } finally {
            setLoading(false);
        }
    };
    const updateTask = async (taskData, taskId) => {
        setLoading(true);

        try {
            const response = await fetch(`${base_url}/tasks/${taskId}`, {
                method: "PUT",
                headers: getHeader(),
                body: JSON.stringify(taskData),
            });
            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error);
                if (data.errors) {
                    data.errors.foreach((error) => toast.error(error));
                }
            } else {
                toast.success("Task updated successfully.");
                setSelectedTask(data.data);
                return true;
            }
        } catch (error) {
            console.log("Error occured while updaing task.", error.message);
            toast.error("Something went wrong. Please try again.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const loadTask = async (taskid) => {
        setLoading(true);
        try {
            const response = await fetch(`${base_url}/tasks/${taskid}`, {
                headers: getHeader(),
            });
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.error);
                if (data.errors) {
                    data.errors.foreach((error) => toast.error(error));
                }
            } else {
                setSelectedTask(data.data);
            }
        } catch (error) {
            console.log("Error occured while fetching task.", error.message);
            toast.error("Something went wrong. Please try again.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const loadTasks = async (url) => {
        setLoading(true);
        try {
            const response = await fetch(url, {
                headers: getHeader(),
            });
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.error);
                if (data.errors) {
                    data.errors.foreach((error) => toast.error(error));
                }
            } else {
                setTasks(data.data);
            }
        } catch (error) {
            console.log("Error occured while fetching tasks.", error.message);
            toast.error("Something went wrong. Please try again.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateProjectStatus = async (projectId, status) => {
        try {
            const response = await fetch(
                `${base_url}/projects/status/${projectId}`,
                {
                    headers: getHeader(),
                    method: "PATCH",
                    body: JSON.stringify(status),
                }
            );
            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error);
                if (data.errors) {
                    data.errors.foreach((error) => toast.error(error));
                }
                return false;
            } else {
                toast.success(data.message);
                return data.data;
            }
        } catch (error) {
            console.log(
                "Error occured while updating project status.",
                error.message
            );
            toast.error("Something went wrong. Please try again.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <DataContext.Provider
            value={{
                user,
                loading,
                isAuthenticated,
                projects,
                login,
                logout,
                signup,
                addProject,
                setLoading,
                loadProjects,
                loadProject,
                updateProjectStatus,
                teams,
                addTeam,
                loadTeams,
                getTeamByName,
                users,
                loadUsers,
                updateTeam,
                tags,
                addTag,
                loadTags,
                tasks,
                addTask,
                loadTasks,
                updateTask,
                loadTask,
                selectedTask,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
