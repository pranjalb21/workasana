import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { CiSearch } from "react-icons/ci";
import ProjectForm from "../components/ProjectForm";
import TaskForm from "../components/TaskForm";
import ProjectContainer from "../components/ProjectContainer";
import { loadColors } from "../constants/Constants";
import TaskContainer from "../components/TaskContainer";
import { useSearchParams } from "react-router-dom";

const statusList = ["To Do", "In Progress", "Completed", "Blocked"];
export default function HomePage() {
    const [showProject, setShowProject] = useState(false);
    const [showTask, setShowTask] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const task_status = searchParams.get("task_status") || "";
    const project_status = searchParams.get("project_status") || "";
    const keyword = searchParams.get("keyword") || "";

    const handleStatusChange = (type, value) => {
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams);

            if (type === "project") {
                value
                    ? newParams.set("project_status", value)
                    : newParams.delete("project_status");
            } else if (type === "task") {
                value
                    ? newParams.set("task_status", value)
                    : newParams.delete("task_status");
            } else if (type === "keyword") {
                value
                    ? newParams.set("keyword", value)
                    : newParams.delete("keyword");
            }

            return newParams;
        });
    };

    useEffect(() => {
        loadColors();
    }, []);
    return (
        <Layout>
            <div className="container mt-5 px-4">
                {showProject && <ProjectForm setShowProject={setShowProject} />}
                {showTask && <TaskForm setShowTask={setShowTask} />}
                <section>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(e) =>
                                handleStatusChange("keyword", e.target.value)
                            }
                        />
                        <span className="input-group-text" id="basic-addon1">
                            <CiSearch />
                        </span>
                    </div>
                </section>
                <section>
                    <div className="d-flex">
                        <h4 className="d-inline-block fs-4 fw-bold m-0 align-self-center">
                            My Projects
                        </h4>
                        <select
                            name="projectFilter"
                            id="projectFilter"
                            className="form-select-sm bg-light ms-3 border-0 px-2 select"
                            style={{ padding: "8px 0px" }}
                            onChange={(e) =>
                                handleStatusChange("project", e.target.value)
                            }
                        >
                            <option value="">Select Status</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <button
                            className="btn btn-sm btn-primary ms-auto"
                            onClick={() => setShowProject(true)}
                        >
                            + New Project
                        </button>
                    </div>
                    <ProjectContainer
                        keyword={keyword}
                        type={"self"}
                        project_status={project_status}
                    />
                </section>
                <section className="mt-5 mb-4">
                    <div className="d-flex ">
                        <h4 className="d-inline-block fs-4 fw-bold m-0 align-self-center">
                            My Tasks
                        </h4>
                        <select
                            name="projectFilter"
                            id="projectFilter"
                            className="form-select-sm bg-light ms-3 border-0 px-2 select"
                            style={{ padding: "8px 0px" }}
                            onChange={(e) =>
                                handleStatusChange("task", e.target.value)
                            }
                        >
                            <option value="">Select Status</option>
                            {statusList.map((status) => (
                                <option value={status} key={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                        <button
                            className="btn btn-sm btn-primary ms-auto"
                            onClick={() => setShowTask((prev) => !prev)}
                        >
                            + New Task
                        </button>
                    </div>
                    <TaskContainer
                        keyword={keyword}
                        type={"self"}
                        task_status={task_status}
                    />
                </section>
            </div>
        </Layout>
    );
}
