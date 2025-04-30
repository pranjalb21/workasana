import React from "react";

export default function ProjectCard({ project }) {
    return (
        <div className="bg-light pcard">
            <span
                className={`cardbadge d-inline-block ${
                    project.status === "Completed" ? "completed" : "inProgress"
                }`}
            >
                {project.status}
            </span>
            <h6 className="fs-6 fw-bold mt-2 ">{project.name}</h6>
            <p className="description">{project.description}</p>
        </div>
    );
}
