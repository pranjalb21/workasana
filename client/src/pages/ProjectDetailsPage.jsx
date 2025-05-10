import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useLocation, useSearchParams } from "react-router-dom";
import {
    base_url,
    generateNameKeyword,
    getDateString,
    loadColors,
} from "../constants/constants";
import { useData } from "../contexts/application.context";
import TaskForm from "../components/TaskForm";

export default function ProjectDetailsPage() {
    const [showProjectTask, setShowProjectTask] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedProject, setSelectedProject] = useState(null);
    const projectID = searchParams.get("projectID");
    const { loadProject, tasks, loadTasks } = useData();

    const loadData = async () => {
        const data = await loadProject(projectID);
        await loadTasks(`${base_url}/tasks/project?projectId=${projectID}`);
        if (data) {
            setSelectedProject(data);
        }
    };
    const handleSelect = () => {
        const tags = document.querySelectorAll(".tags");
        tags.forEach((tag) => {
            tag.addEventListener("click", () => {
                tags.forEach((t) => t.classList.remove("selected"));
                tag.classList.add("selected");
            });
        });
    };

    useEffect(() => {
        loadData();
    }, []);
    useEffect(() => {
        loadColors();
    }, [selectedProject, tasks]);
    return (
        <Layout>
            {showProjectTask && (
                <TaskForm
                    setShowTask={setShowProjectTask}
                    selectedProject={selectedProject}
                />
            )}
            <section className="container mt-5">
                {selectedProject ? (
                    <>
                        <h3 className="fs-3">{selectedProject.name}</h3>
                        <p className="projectDescription">
                            {selectedProject.description}
                        </p>
                        <div className="row justify-content-between pe-4">
                            <div className="col-md-6">
                                <span>Sort by:</span>
                                <ul className="tag-container">
                                    <li className="tags" onClick={handleSelect}>
                                        Priority Low-High
                                    </li>
                                    <li className="tags" onClick={handleSelect}>
                                        Priority High-Low
                                    </li>
                                    <li className="tags" onClick={handleSelect}>
                                        Newest First
                                    </li>
                                    <li className="tags" onClick={handleSelect}>
                                        Oldest First
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex gap-3 justify-content-end h-100 align-items-start">
                                    <div className="">
                                        <select
                                            name=""
                                            id=""
                                            className="form-select-sm"
                                        >
                                            <option value="">Filter</option>
                                        </select>
                                    </div>
                                    <div className="">
                                        <button
                                            onClick={() =>
                                                setShowProjectTask(true)
                                            }
                                            className="btn btn-sm btn-primary"
                                        >
                                            + New Task
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            {tasks && tasks?.length > 0 ? (
                                <>
                                    <table className="table table-bordered table-sm">
                                        <thead className="table-primary">
                                            <tr>
                                                <th scope="col">TASKS</th>
                                                <th scope="col">OWNER</th>
                                                <th scope="col">PRIORITY</th>
                                                <th scope="col">DUE ON</th>
                                                <th scope="col">STATUS</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tasks.map((task) => (
                                                <tr key={task._id}>
                                                    <td>{task.name}</td>
                                                    <td>
                                                        <ul className="name-container">
                                                            {task?.owners?.map(
                                                                (
                                                                    owner,
                                                                    index
                                                                ) =>
                                                                    index <
                                                                        2 && (
                                                                        <li
                                                                            key={
                                                                                owner?._id
                                                                            }
                                                                            style={{
                                                                                display:
                                                                                    "inline-block",
                                                                                ...(index >
                                                                                    -1 && {
                                                                                    marginLeft:
                                                                                        "-5px",
                                                                                }),
                                                                                height: "25px",
                                                                                width: "25px",
                                                                                borderRadius:
                                                                                    "50%",
                                                                                textAlign:
                                                                                    "center",
                                                                            }}
                                                                            className="namepill"
                                                                        >
                                                                            {generateNameKeyword(
                                                                                owner?.name
                                                                            )}
                                                                        </li>
                                                                    )
                                                            )}
                                                            {task?.owners
                                                                ?.length >
                                                                2 && (
                                                                <li
                                                                    style={{
                                                                        display:
                                                                            "inline-block",

                                                                        marginLeft:
                                                                            "-5px",

                                                                        height: "25px",
                                                                        width: "25px",
                                                                        borderRadius:
                                                                            "50%",
                                                                        textAlign:
                                                                            "center",
                                                                        fontSize:
                                                                            "0.9rem",
                                                                    }}
                                                                    className="namepill"
                                                                >
                                                                    +
                                                                    {task.owners
                                                                        .length -
                                                                        2}
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </td>
                                                    <td>
                                                        <span
                                                            className={`cardbadge d-inline-block ${task.priority.toLowerCase()}`}
                                                        >
                                                            &#9872;{" "}
                                                            {task.priority}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <small>
                                                            {getDateString(
                                                                task.timeToComplete
                                                            )}
                                                        </small>
                                                    </td>
                                                    <td>
                                                        <span
                                                        // className={`cardbadge d-inline-block ${
                                                        //     task.status ===
                                                        //     "In Progress"
                                                        //         ? "inProgress"
                                                        //         : task.status.toLowerCase()
                                                        // }`}
                                                        >
                                                            {task.status}
                                                        </span>
                                                    </td>
                                                    <td className="goToTask">
                                                        <span>&rarr;</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </>
                            ) : (
                                <p>No tasks found</p>
                            )}
                        </div>
                    </>
                ) : (
                    <p>Project not found</p>
                )}
            </section>
        </Layout>
    );
}
