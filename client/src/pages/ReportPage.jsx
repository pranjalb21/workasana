import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useData } from "../contexts/application.context";
import { base_url, getTimeDifference } from "../constants/constants";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// import { Tooltip } from "bootstrap/dist/js/bootstrap.bundle.min";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function ReportPage() {
    const { loadTasks, tasks } = useData();
    const [workPendingChart, setWorkPendingChart] = useState({
        labels: [],
        datasets: [],
    });
    const [workDoneLastWeekChart, setWorkDoneLastWeekChart] = useState({
        labels: [],
        datasets: [],
    });

    const calculateWorkPendingReport = () => {
        if (!tasks || tasks.length === 0) return; // Prevent errors on empty data

        const totalWorkInDays = tasks.reduce((acc, curr) => {
            return acc + getTimeDifference(curr.createdAt, curr.timeToComplete);
        }, 0);

        const totalLeftInDays = tasks.reduce((acc, curr) => {
            return acc + getTimeDifference(new Date(), curr.timeToComplete);
        }, 0);

        const totalWorkedDays = Math.max(totalWorkInDays - totalLeftInDays, 0); // Prevent negative values

        const data = {
            labels: ["Total Work", "Total Work Left"],
            datasets: [
                {
                    label: "Work Report",
                    data: [totalWorkInDays, totalLeftInDays],
                    backgroundColor: [
                        "rgba(136, 146, 253, 0.2)",
                        "rgba(255, 109, 99, 0.2)",
                    ],
                    borderColor: [
                        "rgba(136, 146, 253, 1)",
                        "rgba(255, 109, 99, 1)",
                    ],
                },
            ],
        };

        setWorkPendingChart(data);
    };

    const calculateWorkDoneLastWeekReport = () => {
        if (!tasks || tasks.length === 0) return;
        const taskClosedLastSevenDays = tasks.filter((task) => {
            if (
                task.status === "Closed" &&
                getTimeDifference(new Date(), task.updatedAt) <= 7
            )
                return task;
        });
        console.log(taskClosedLastSevenDays);
    };

    const loadData = async () => {
        const url = `${base_url}/tasks`;
        await loadTasks(url);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        calculateWorkPendingReport();
        calculateWorkDoneLastWeekReport();
    }, [tasks]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Work Progress Overview",
            },
        },
    };

    return (
        <Layout>
            <section className="container mt-5 px-4">
                <h3 className="text-center fs-3 text-success-emphasis">
                    Workasana Reports Overview
                </h3>
                <hr />
                <div>
                    {workPendingChart.labels.length > 0 && (
                        <Bar options={options} data={workPendingChart} />
                    )}
                </div>
                <hr />
                <div></div>
            </section>
        </Layout>
    );
}
