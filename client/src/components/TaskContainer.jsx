import React, { useEffect } from "react";
import TaskCard from "./TaskCard";
import { useData } from "../contexts/application.context";
import { base_url } from "../constants/constants";

export default function TaskContainer({ type = "" }) {
    const { tasks, loadTasks } = useData();
    const loadData = async () => {
        await loadTasks(`${base_url}/tasks/${type === "self" && type}`);
    };
    useEffect(() => {
        loadData();
    }, []);
    return (
        <div className="d-flex flex-wrap gap-3 mt-3">
            {tasks && tasks?.length > 0 ? (
                tasks.map((task) => <TaskCard task={task} key={task._id} />)
            ) : (
                <p>No task found.</p>
            )}
        </div>
    );
}
