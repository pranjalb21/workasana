import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import TeamPage from "./pages/TeamPage";
import ReportPage from "./pages/ReportPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project" element={<ProjectPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/reports" element={<ReportPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
        </Routes>
    );
}

export default App;
