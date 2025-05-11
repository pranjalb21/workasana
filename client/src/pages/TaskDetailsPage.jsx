import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink, useSearchParams } from "react-router-dom";
import { base_url, getDateString } from "../constants/constants";
import { useData } from "../contexts/application.context";
import { getHeader } from "../auth/addHeader";

const statusList = ["To Do", "In Progress", "Completed", "Blocked"];
export default function TaskDetailsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const taskID = searchParams.get("taskID");
    const [selectedTask, setSelectedTask] = useState(null);
    const { setLoading } = useData();
    const [formData, setFormData] = useState({});
    const loadTask = async (taskid) => {
        setLoading(true);
        try {
            const response = await fetch(`${base_url}/tasks/${taskid}`, {
                headers: getHeader(),
            });
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.error);
                if (data.errors) {
                    data.errors.foreach((error) => toast.error(error));
                }
            } else {
                // console.log(data.data);
                const defaultData = {
                    name: data.data.name,
                    project: data.data.project._id,
                    team: data.data.team._id,
                    owners: data.data.owners.map((owner) => owner._id),
                    tags: data.data.tags.map((tag) => tag._id),
                    timeToComplete: data.data.timeToComplete,
                    status: data.data.status,
                    priority: data.data.priority,
                };
                setFormData(defaultData);
                setSelectedTask(data.data);
            }
        } catch (error) {
            console.log("Error occured while fetching task.", error.message);
            toast.error("Something went wrong. Please try again.");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const getTimeDifference = (dueDate) => {
        const currentDate = new Date();
        const givenDate = new Date(dueDate); // Example date

        const timeDifference = givenDate - currentDate; // Difference in milliseconds
        const daysDifference = Math.floor(
            timeDifference / (1000 * 60 * 60 * 24)
        );

        // console.log(`Difference: ${daysDifference} days`);
        return daysDifference > 0 ? daysDifference : 0;
    };
    useEffect(() => {
        loadTask(taskID);
    }, [taskID, searchParams]);
    return (
        <Layout>
            <section className="container mt-5 px-4">
                <div className="">
                    <p className="back" style={{marginLeft:"0.1rem"}}>
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
                                                            >
                                                                {status}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                                <button className="btn btn-outline-info btn-sm ms-2 mt-0">
                                                    Update
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Time Remaining:</th>
                                            <td>
                                                {getTimeDifference(
                                                    selectedTask.timeToComplete
                                                )}
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
