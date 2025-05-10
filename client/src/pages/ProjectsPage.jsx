import React from "react";
import ProjectContainer from "../components/ProjectContainer";
import Layout from "../components/Layout";

export default function ProjectsPage() {
    return (
        <Layout>
            <section className="container mt-3">
                <div className="d-flex">
                    <h4 className="d-inline-block fs-4 fw-bold m-0 align-self-center">
                        My Projects
                    </h4>
                    <select
                        name="projectFilter"
                        id="projectFilter"
                        className="form-select-sm bg-light ms-3 border-0 px-2 select"
                        style={{ padding: "8px 0px" }}
                    >
                        <option value="">Filter</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <button
                        className="btn btn-sm btn-primary ms-auto"
                        onClick={() => setShowProject((prev) => !prev)}
                    >
                        + New Project
                    </button>
                </div>
                <ProjectContainer />
            </section>
        </Layout>
    );
}
