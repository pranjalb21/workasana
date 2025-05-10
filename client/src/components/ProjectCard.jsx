import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function ProjectCard({ project }) {
    return (
        <NavLink
            className="text-decoration-none"
            to={`/project-details?projectID=${project._id}`}
        >
            <div className="bg-light pcard">
                <span
                    className={`cardbadge d-inline-block ${
                        project.status === "Completed"
                            ? "completed"
                            : "inProgress"
                    }`}
                >
                    {project.status}
                </span>
                <h6 className="fs-6 fw-bold mt-2 heading">
                    <p className="d-inline-block">{project.name}</p>
                    <span className="go ms-1">&rarr;</span>
                </h6>
                <p className="description">{project.description}</p>
            </div>
        </NavLink>
    );
}
