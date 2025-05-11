import React, { useEffect } from "react";
import TaskCard from "./TaskCard";
import { useData } from "../contexts/application.context";
import { base_url } from "../constants/constants";

export default function TaskContainer({ type = "", task_status, keyword }) {
    const { tasks, loadTasks } = useData();
    const loadData = async () => {
        let url = new URL(`${base_url}/tasks`);

        if (type) {
            url.pathname += `/${type}`;
        }

        const params = new URLSearchParams();
        if (task_status) params.set("task_status", task_status);
        if (keyword) params.set("keyword", keyword);

        url.search = params.toString(); // Automatically appends '?' only if parameters exist

        await loadTasks(url.toString());
    };
    useEffect(() => {
        loadData();
    }, []);
    useEffect(() => {
        loadData();
    }, [task_status, keyword]);
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
