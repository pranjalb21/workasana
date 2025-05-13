import { useState } from "react";
import ProjectContainer from "../components/ProjectContainer";
import Layout from "../components/Layout";
import ProjectForm from "../components/ProjectForm";
import { useSearchParams } from "react-router-dom";

export default function ProjectsPage() {
    const [showProject, setShowProject] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const project_status = searchParams.get("project_status") || "";

    const changeStatus = (status) => {
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams);
            if (status === "") {
                newParams.delete("project_status");
            } else {
                newParams.set("project_status", status);
            }
            return newParams;
        });
    };

    return (
        <Layout>
            {showProject && <ProjectForm setShowProject={setShowProject} />}
            <section className="container mt-5 px-4">
                <div className="d-flex">
                    <h4 className="d-inline-block fs-4 fw-bold m-0 align-self-center">
                        Projects
                    </h4>
                    <select
                        name="projectFilter"
                        id="projectFilter"
                        className="form-select-sm bg-light ms-3 border-0 px-2 select"
                        style={{ padding: "8px 0px" }}
                        onChange={(e) => changeStatus(e.target.value)}
                    >
                        <option value="">Select Status</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <button
                        className="btn btn-sm btn-primary ms-auto"
                        onClick={() => setShowProject(true)}
                    >
                        + New Project
                    </button>
                </div>
                <ProjectContainer project_status={project_status} />
            </section>
        </Layout>
    );
}
