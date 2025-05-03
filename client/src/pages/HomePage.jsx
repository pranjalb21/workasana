import React, { useState } from "react";
import Layout from "../components/Layout";
import ProjectCard from "../components/ProjectCard";
import TaskCard from "../components/TaskCard";
import { CiSearch } from "react-icons/ci";
import ProjectForm from "../components/ProjectForm";
import TaskForm from "../components/TaskForm";

const projectDetailsList = [
    {
        id: 1,
        status: "In Progress",
        name: "Create Moodboard",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod sagittis lectus, eget gravida purus commodo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Curabitur tincidunt lorem ac justo tristique, vitae semper elit mollis. Integer non fringilla urna, sed interdum nulla. Nam tempus felis a eros suscipit, laoreet.",
    },
    {
        id: 2,
        status: "Completed",
        name: "Create Moodboard",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod sagittis lectus, eget gravida purus commodo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Curabitur tincidunt lorem ac justo tristique, vitae semper elit mollis. Integer non fringilla urna, sed interdum nulla. Nam tempus felis a eros suscipit, laoreet.",
    },
    {
        id: 3,
        status: "Completed",
        name: "Create Moodboard",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod sagittis lectus, eget gravida purus commodo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Curabitur tincidunt lorem ac justo tristique, vitae semper elit mollis. Integer non fringilla urna, sed interdum nulla. Nam tempus felis a eros suscipit, laoreet.",
    },
];
const taskList = [
    {
        id: 1,
        status: "In Progress",
        name: "Create filter feature",
        timeToClose: "20th Dec 2024",
        owners: [
            { id: 11, name: "John Doe" },
            { id: 12, name: "Smith John" },
        ],
    },
    {
        id: 2,
        status: "Completed",
        name: "Create filter feature",
        timeToClose: "20th Dec 2024",
        owners: [
            { id: 13, name: "John Doe" },
            { id: 14, name: "Smith John" },
        ],
    },
    {
        id: 3,
        status: "In Progress",
        name: "Create filter feature",
        timeToClose: "20th Dec 2024",
        owners: [
            { id: 15, name: "John Doe" },
            { id: 16, name: "Smith John" },
        ],
    },
];

export default function HomePage() {
    const [showProject, setShowProject] = useState(false);
    const [showTask, setShowTask] = useState(false);
    return (
        <Layout>
            <div className="container mt-4 px-4">
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
                            Projects
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
                    <div className="d-flex flex-wrap gap-3 mt-3">
                        {projectDetailsList.map((project) => (
                            <ProjectCard project={project} key={project.id} />
                        ))}
                    </div>
                </section>
                <section className="mt-5">
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
                    <div className="d-flex flex-wrap gap-3 mt-3">
                        {taskList.map((task) => (
                            <TaskCard task={task} key={task.id} />
                        ))}
                    </div>
                </section>
            </div>
        </Layout>
    );
}
