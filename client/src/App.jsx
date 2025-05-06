import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import TeamPage from "./pages/TeamPage";
import TeamDetails from "./pages/TeamDetails";
import ReportPage from "./pages/ReportPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Loader from "./components/Loader";
import useData from "./hooks/useData";
const isAuthenticated = false; // Replace this with actual authentication logic

function App() {
    const { loading } = useData();
    return (
        <>
            {loading && <Loader />}
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />

                {/* Protected Routes */}
                <Route
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} />
                    }
                >
                    <Route path="/" element={<HomePage />} />
                    <Route path="/project" element={<ProjectPage />} />
                    <Route path="/team" element={<TeamPage />} />
                    <Route path="/teamdetails" element={<TeamDetails />} />
                    <Route path="/reports" element={<ReportPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
