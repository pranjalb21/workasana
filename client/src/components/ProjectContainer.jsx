import React, { useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { useData } from "../contexts/application.context";
import { base_url } from "../constants/constants";

export default function ProjectContainer({ type = "", project_status }) {
    const { loadProjects, projects } = useData();

    useEffect(() => {
        loadProjects(`${base_url}/projects/${type}`);
    }, []);
    useEffect(() => {
        loadProjects(
            `${base_url}/projects/${type}?project_status=${project_status}`
        );
    }, [project_status]);
    return (
        <div className="d-flex flex-wrap gap-3 mt-3">
            {projects && projects?.length > 0 ? (
                projects?.map((project) => (
                    <ProjectCard project={project} key={project._id} />
                ))
            ) : (
                <p className="fs-6">No project found.</p>
            )}
        </div>
    );
}
