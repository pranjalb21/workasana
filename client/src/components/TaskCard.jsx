import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    generateNameKeyword,
    getDateString,
    loadColors,
} from "../constants/constants";

export default function TaskCard({ task }) {
    useEffect(() => {
        loadColors();
    }, [task]);
    return (
        <div className="bg-light tcard">
            <span
                className={`cardbadge d-inline-block ${
                    task.status === "In Progress"
                        ? "inProgress"
                        : task.status === "To Do"
                        ? "todo"
                        : task.status.toLowerCase()
                }`}
            >
                {task.status}
            </span>
            <h6 className="fs-6 fw-bold mt-2 heading">
                <Link className="text-decoration-none">{task.name}</Link>
                <span className="go">&rarr;</span>
            </h6>
            <p className="description">
                Due on: {getDateString(task.timeToComplete)}
            </p>
            <ul className="name-container">
                {task?.owners?.map(
                    (owner, index) =>
                        index < 2 && (
                            <li
                                key={owner?._id}
                                style={{
                                    display: "inline-block",
                                    ...(index > -1 && {
                                        marginLeft: "-5px",
                                    }),
                                    height: "25px",
                                    width: "25px",
                                    borderRadius: "50%",
                                    textAlign: "center",
                                }}
                                className="namepill"
                            >
                                {generateNameKeyword(owner?.name)}
                            </li>
                        )
                )}
                {task?.owners?.length > 2 && (
                    <li
                        style={{
                            display: "inline-block",

                            marginLeft: "-5px",

                            height: "25px",
                            width: "25px",
                            borderRadius: "50%",
                            textAlign: "center",
                            fontSize: "0.9rem",
                        }}
                        className="namepill"
                    >
                        +{task.owners.length - 2}
                    </li>
                )}
            </ul>
        </div>
    );
}
