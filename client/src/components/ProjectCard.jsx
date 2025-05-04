import React from "react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
    return (
        <div className="bg-light pcard ">
            <span
                className={`cardbadge d-inline-block ${
                    project.status === "Completed" ? "completed" : "inProgress"
                }`}
            >
                {project.status}
            </span>
            <h6 className="fs-6 fw-bold mt-2 heading">
                <Link className="text-decoration-none">{project.name}</Link>
                <span className="go">&rarr;</span>
            </h6>
            <p className="description">{project.description}</p>
        </div>
    );
}
