import React from "react";
import { Link } from "react-router-dom";
import { generateNameKeyword } from "../constants/constants";

export default function TaskCard({ task }) {
    return (
        <div className="bg-light tcard">
            <span
                className={`cardbadge d-inline-block ${
                    task.status === "Completed" ? "completed" : "inProgress"
                }`}
            >
                {task.status}
            </span>
            <h6 className="fs-6 fw-bold mt-2 heading">
                <Link className="text-decoration-none">{task.name}</Link>
                <span className="go">&rarr;</span>
            </h6>
            <p className="description">Due on: {task.timeToClose}</p>
            <ul className="namecard-container">
                {task.owners.map((owner) => (
                    <li className="namecard" key={owner.id}>
                        {generateNameKeyword(owner.name)}
                    </li>
                ))}
            </ul>
        </div>
    );
}
