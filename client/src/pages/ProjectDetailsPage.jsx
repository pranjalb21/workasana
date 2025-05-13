import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
    NavLink,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import {
    base_url,
    generateNameKeyword,
    getDateString,
    loadColors,
    statusList,
} from "../constants/Constants";
import { useData } from "../contexts/Application.context";
import TaskForm from "../components/TaskForm";

export default function ProjectDetailsPage() {
    const [showProjectTask, setShowProjectTask] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedProject, setSelectedProject] = useState(null);
    const { loadProject, tasks, loadTasks, updateProjectStatus } = useData();
    const navigate = useNavigate();
    const [statusUpdate, setStatusUpdate] = useState("");

    const projectID = searchParams.get("projectID") || "";
    const priority = searchParams.get("priority") || "";
    const created = searchParams.get("created") || "";
    const status = searchParams.get("status") || "";

    const handleStatusChange = (type, value) => {
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams);

            if (type === "priority") {
                value
                    ? newParams.set("priority", value)
                    : newParams.delete("priority");
            } else if (type === "created") {
                value
                    ? newParams.set("created", value)
                    : newParams.delete("created");
            } else if (type === "status") {
                value
                    ? newParams.set("status", value)
                    : newParams.delete("status");
            }

            return newParams;
        });
    };

    const loadData = async () => {
        const data = await loadProject(projectID);
        let url = `${base_url}/tasks/project?`;
        if (projectID) url += `&projectId=${projectID}`;
        if (priority) url += `&priority=${priority}`;
        if (created) url += `&created=${created}`;
        if (status) url += `&status=${status}`;
        await loadTasks(url);
        if (data) {
            setSelectedProject(data);
            setStatusUpdate(data.status);
        }
    };
    const tags = document.querySelectorAll(".tags");
    tags.forEach((tag) => {
        tag.addEventListener("click", () => {
            tags.forEach((t) => t.classList.remove("selected"));
            tag.classList.add("selected");
        });
    });

    const handleProjectStatusUpdate = async () => {
        const result = await updateProjectStatus(selectedProject._id, {
            status: statusUpdate,
        });
        if (result) {
            setSelectedProject(result);
        }
    };

    useEffect(() => {
        loadData();
    }, [searchParams]);
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
                <p className="back" style={{ marginLeft: "0.1rem" }}>
                    <NavLink
                        className="text-decoration-none backArrow"
                        to={"/"}
                    >
                        <span>&larr;</span> Back to Dashboard
                    </NavLink>
                </p>
                <div className="d-flex justify-content-between">
                    <h3 className="fs-3">{selectedProject?.name}</h3>
                    <div>
                        <select
                            name="status"
                            id="status"
                            className="form-select-sm"
                            value={statusUpdate}
                            onChange={(e) => setStatusUpdate(e.target.value)}
                        >
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <button
                            className="btn btn-outline-info btn-sm ms-2 mt-0"
                            onClick={handleProjectStatusUpdate}
                        >
                            Update
                        </button>
                    </div>
                </div>
                <p className="projectDescription">
                    {selectedProject?.description}
                </p>
                <div className="row justify-content-between pe-4">
                    <div className="col-md-6">
                        <span>Sort by:</span>
                        <ul className="tag-container">
                            <li
                                className="tags"
                                onClick={() =>
                                    handleStatusChange("priority", "ascending")
                                }
                            >
                                Priority Low-High
                            </li>
                            <li
                                className="tags"
                                onClick={() =>
                                    handleStatusChange("priority", "descending")
                                }
                            >
                                Priority High-Low
                            </li>
                            <li
                                className="tags"
                                onClick={() =>
                                    handleStatusChange("created", "newest")
                                }
                            >
                                Newest First
                            </li>
                            <li
                                className="tags"
                                onClick={() =>
                                    handleStatusChange("created", "oldest")
                                }
                            >
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
                                    onClick={(e) =>
                                        handleStatusChange(
                                            "status",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Select Status</option>
                                    {statusList.map((status) => (
                                        <option value={status} key={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="">
                                <button
                                    onClick={() => setShowProjectTask(true)}
                                    className="btn btn-sm btn-primary"
                                >
                                    + New Task
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {selectedProject ? (
                    <>
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
                                                            className={`cardbadge d-inline-block ${
                                                                task.priority ===
                                                                1
                                                                    ? "high"
                                                                    : task.priority ===
                                                                      2
                                                                    ? "medium"
                                                                    : "low"
                                                            }`}
                                                        >
                                                            &#9872;{" "}
                                                            {task.priority === 1
                                                                ? "High"
                                                                : task.priority ===
                                                                  2
                                                                ? "Medium"
                                                                : "Low"}
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
                                                            className={`cardbadge d-inline-block ${
                                                                task.status ===
                                                                "In Progress"
                                                                    ? "inProgress"
                                                                    : task.status ===
                                                                      "To Do"
                                                                    ? "todo"
                                                                    : task.status.toLowerCase()
                                                            }`}
                                                        >
                                                            {task.status}
                                                        </span>
                                                    </td>
                                                    <td
                                                        className="goToTask"
                                                        onClick={() =>
                                                            navigate(
                                                                `/task-details?taskID=${task._id}`
                                                            )
                                                        }
                                                    >
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
