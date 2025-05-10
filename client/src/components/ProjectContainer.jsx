import React, { useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { useData } from "../contexts/application.context";
import { base_url } from "../constants/constants";

export default function ProjectContainer({ type = "" }) {
    const { loadProjects, projects } = useData();
    useEffect(() => {
        loadProjects(`${base_url}/projects/${type}`);
    }, []);
    return (
        <div className="d-flex flex-wrap gap-3 mt-3">
            {projects?.map((project) => (
                <ProjectCard project={project} key={project._id} />
            ))}
        </div>
    );
}
