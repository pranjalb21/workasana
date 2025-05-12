import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TeamPage from "./pages/TeamPage";
import TeamDetails from "./pages/TeamDetails";
import ReportPage from "./pages/ReportPage";
import SettingsPage from "./pages/SettingsPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Loader from "./components/Loader";
import useData from "./hooks/useData";
import LoginPage from "./pages/LoginPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import SignUpPage from "./pages/SignUpPage";

const isAuthenticated = false; // Replace this with actual authentication logic

function App() {
    const { loading } = useData();
    return (
        <>
            {loading && <Loader />}
            <Routes>
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Protected Routes */}
                <Route
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} />
                    }
                >
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/project-details"
                        element={<ProjectDetailsPage />}
                    />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/team" element={<TeamPage />} />
                    <Route path="/team-details" element={<TeamDetails />} />
                    <Route path="/reports" element={<ReportPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/task-details" element={<TaskDetailsPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
