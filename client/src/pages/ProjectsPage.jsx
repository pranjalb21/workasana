import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProjectTaskForm from "../components/ProjectTaskForm";

const tasks = [
    {
        id: 11,
        name: "Create Tab",
        owners: [
            { id: 21, name: "John Doe" },
            { id: 22, name: "John Doe" },
        ],
        priority: "High",
        status: "Completed",
        dueOn: "20 Dec, 2024",
    },
    {
        id: 12,
        name: "Create Tab",
        owners: [
            { id: 23, name: "Smith John" },
            { id: 24, name: "Smith John" },
        ],
        priority: "Low",
        status: "In Progress",
        dueOn: "20 Dec, 2024",
    },
    {
        id: 13,
        name: "Create Tab",
        owners: [
            { id: 25, name: "Smith John" },
            { id: 26, name: "Smith John" },
        ],
        priority: "Medium",
        status: "In Progress",
        dueOn: "20 Dec, 2024",
    },
];
export default function ProjectsPage() {
    const [showProjectTask, setShowProjectTask] = useState(false);
    const handleSelect = () => {
        const tags = document.querySelectorAll(".tags");
        tags.forEach((tag) => {
            tag.addEventListener("click", () => {
                tags.forEach((t) => t.classList.remove("selected"));
                // console.log("clicked");

                tag.classList.add("selected");
            });
        });
    };
    const generateNameKeyword = (name) => {
        const nameArray = name.split(" ");
        let nameKeyword = nameArray[0][0] + nameArray[nameArray.length - 1][0];
        return nameKeyword;
    };
    function getRandomColor() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16); // Random hex color
    }

    function getTextColor(bgColor) {
        // Convert hex to RGB
        let r = parseInt(bgColor.substring(1, 3), 16);
        let g = parseInt(bgColor.substring(3, 5), 16);
        let b = parseInt(bgColor.substring(5, 7), 16);

        // Calculate luminance
        let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        // Choose black or white based on luminance
        return luminance > 0.5 ? "#000000" : "#FFFFFF";
    }

    const loadColors = () => {
        document.querySelectorAll(".namecard").forEach((pill) => {
            let bgColor = getRandomColor();
            pill.style.backgroundColor = bgColor;
            pill.style.color = getTextColor(bgColor); // Ensures contrast
        });
    };
    useEffect(() => {
        loadColors();
    }, []);
    return (
        <Layout>
            {showProjectTask && (
                <ProjectTaskForm setShowProjectTask={setShowProjectTask} />
            )}
            <section className="container mt-5">
                <h3 className="fs-3">Project Title</h3>
                <p className="projectDescription">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Perferendis, accusamus fuga dignissimos deserunt, veritatis
                    praesentium molestiae a esse odit deleniti officia placeat
                    labore modi exercitationem! Maxime, excepturi. Tempore animi
                    laudantium sapiente sit dicta suscipit culpa aperiam? Quasi
                    dignissimos cumque praesentium! Similique, quam ratione
                    vitae in quos alias ipsum dolore vero.
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
                                    onClick={() => setShowProjectTask(true)}
                                    className="btn btn-sm btn-primary"
                                >
                                    + New Task
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <table className="table border rounded-2 table-bordered table-sm">
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
                                <tr key={task.id}>
                                    <td>{task.name}</td>
                                    <td>
                                        <ul className="namecard-container">
                                            {task.owners.map((owner) => (
                                                <li
                                                    className="namecard"
                                                    key={owner.id}
                                                >
                                                    {generateNameKeyword(
                                                        owner.name
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        <span
                                            className={`cardbadge d-inline-block ${task.priority.toLowerCase()}`}
                                        >
                                            &#9872; {task.priority}
                                        </span>
                                    </td>
                                    <td>
                                        <small>{task.dueOn}</small>
                                    </td>
                                    <td>
                                        <span
                                            className={`cardbadge d-inline-block ${
                                                task.status === "In Progress"
                                                    ? "inProgress"
                                                    : task.status.toLowerCase()
                                            }`}
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
                </div>
            </section>
        </Layout>
    );
}
