import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProjectCard from "../components/ProjectCard";
import TaskCard from "../components/TaskCard";
import { CiSearch } from "react-icons/ci";
import ProjectForm from "../components/ProjectForm";
import TaskForm from "../components/TaskForm";
import { useData } from "../contexts/application.context";
import ProjectContainer from "../components/ProjectContainer";
import { loadColors } from "../constants/constants";
import TaskContainer from "../components/TaskContainer";


export default function HomePage() {
    const [showProject, setShowProject] = useState(false);
    const [showTask, setShowTask] = useState(false);

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
                        >
                            <option value="">Filter</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <button
                            className="btn btn-sm btn-primary ms-auto"
                            onClick={() => setShowProject((prev) => !prev)}
                        >
                            + New Project
                        </button>
                    </div>
                    <ProjectContainer type={"self"} />
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
                        >
                            <option value="">Filter</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <button
                            className="btn btn-sm btn-primary ms-auto"
                            onClick={() => setShowTask((prev) => !prev)}
                        >
                            + New Task
                        </button>
                    </div>
                    <TaskContainer type={"self"} />
                </section>
            </div>
        </Layout>
    );
}
