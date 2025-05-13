import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink, useSearchParams } from "react-router-dom";
import {
    base_url,
    getDateString,
    getTimeDifference,
} from "../constants/constants";
import { useData } from "../contexts/Application.context";
import { getHeader } from "../auth/addHeader";

const statusList = ["To Do", "In Progress", "Completed", "Blocked"];
export default function TaskDetailsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const taskID = searchParams.get("taskID");
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState(null);
    const { loadTask, selectedTask, updateTask } = useData();

    const validateInput = () => {
        const inputError = {};
        if (!formData.status) {
            inputError.status = "Please select task status.";
        }
        setErrors(inputError);
        return Object.keys(inputError).length;
    };

    const handleSubmit = async () => {
        if (!validateInput()) {
            await updateTask(formData, selectedTask._id);
        }
    };
    const loadData = async () => {
        await loadTask(taskID);
    };
    useEffect(() => {
        loadData();
    }, [taskID, searchParams]);
    useEffect(() => {
        if (selectedTask) {
            const defaultData = {
                name: selectedTask.name,
                project: selectedTask.project._id,
                team: selectedTask.team._id,
                owners: selectedTask.owners.map((owner) => owner._id),
                tags: selectedTask.tags.map((tag) => tag._id),
                timeToComplete: selectedTask.timeToComplete,
                status: selectedTask.status,
                priority: selectedTask.priority,
            };
            setFormData(defaultData);
        }
    }, [selectedTask]);
    return (
        <Layout>
            <section className="container mt-5 px-4">
                <div className="">
                    <p className="back" style={{ marginLeft: "0.1rem" }}>
                        <NavLink
                            className="text-decoration-none backArrow"
                            to={"/"}
                        >
                            <span>&larr;</span> Back to Dashboard
                        </NavLink>
                    </p>
                    {selectedTask ? (
                        <>
                            <h4 className="fs-3 ">
                                Task:{" "}
                                <span className="text-success">
                                    {selectedTask?.name}
                                </span>
                            </h4>
                            <hr className="mt-3 mb-0" />
                            <div className="px-3">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th>Project:</th>
                                            <td>{selectedTask.project.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Team:</th>
                                            <td>{selectedTask.team.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Owners:</th>
                                            <td>
                                                {selectedTask.owners
                                                    .map((owner) => owner.name)
                                                    .join(", ")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Tags:</th>
                                            <td>
                                                {selectedTask.tags
                                                    .map((tag) => tag.name)
                                                    .join(", ")}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Due Date:</th>
                                            <td>
                                                {getDateString(
                                                    selectedTask.timeToComplete
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Current Status:</th>
                                            <td>
                                                <select
                                                    name="status"
                                                    id="status"
                                                    className="form-select-sm"
                                                    value={formData.status}
                                                    onChange={(e) =>
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            [e.target.name]:
                                                                e.target.value,
                                                        }))
                                                    }
                                                >
                                                    {statusList.map(
                                                        (status) => (
                                                            <option
                                                                value={status}
                                                                key={status}
                                                            >
                                                                {status}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                                <button
                                                    className="btn btn-outline-info btn-sm ms-2 mt-0"
                                                    onClick={handleSubmit}
                                                >
                                                    Update
                                                </button>
                                                {errors?.status && (
                                                    <p className="text-danger m-0">
                                                        {errors.status}
                                                    </p>
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Time Remaining:</th>
                                            <td>
                                                {getTimeDifference(
                                                    new Date(),
                                                    selectedTask.timeToComplete
                                                )}{" "}
                                                Day
                                                {getTimeDifference(
                                                    new Date(),
                                                    selectedTask.timeToComplete
                                                ) > 1
                                                    ? "s"
                                                    : ""}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <h4 className="fs-3">Task not found</h4>
                    )}
                </div>
            </section>
        </Layout>
    );
}
