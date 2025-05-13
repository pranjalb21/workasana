import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useData } from "../contexts/Application.context";
import { base_url, getTimeDifference } from "../constants/Constants";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
    ArcElement,
} from "chart.js";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
// import { Tooltip } from "bootstrap/dist/js/bootstrap.bundle.min";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
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
    const [taskStatusChart, setTaskStatus] = useState({
        labels: [],
        datasets: [],
    });

    const calculateWorkPendingReport = () => {
        if (!tasks || tasks.length === 0) return; // Prevent errors on empty data

        const totalWorkInDays = tasks.reduce((acc, curr) => {
            return acc + getTimeDifference(curr.createdAt, curr.timeToComplete);
        }, 0);

        const totalLeftInDays = tasks.reduce((acc, curr) => {
            // console.log(
            //     curr.status,
            //     curr.createdAt,
            //     curr.timeToComplete,
            //     getTimeDifference(new Date(), curr.timeToComplete),
            //     acc
            // );

            return (
                acc +
                (curr.status === "Completed"
                    ? 0
                    : getTimeDifference(new Date(), curr.timeToComplete))
            );
        }, 0);

        const totalWorkedDays = Math.max(totalWorkInDays - totalLeftInDays, 0); // Prevent negative values

        const data = {
            labels: ["Work Report"],
            datasets: [
                {
                    label: "Total Work",
                    data: [totalWorkInDays],
                    backgroundColor: ["rgba(136, 146, 253, 0.2)"],
                    borderColor: ["rgba(136, 146, 253, 1)"],
                },
                {
                    label: "Work Left",
                    data: [totalLeftInDays],
                    backgroundColor: ["rgba(255, 109, 99, 0.2)"],
                    borderColor: ["rgba(255, 109, 99, 1)"],
                },
            ],
        };

        setWorkPendingChart(data);
    };

    const calculateWorkDoneLastWeekReport = () => {
        if (!tasks || tasks.length === 0) return;
        const taskClosedLastSevenDays = tasks.filter((task) => {
            if (
                task.status === "Completed" &&
                getTimeDifference(task.updatedAt, new Date()) <= 7
            )
                return task;
        });
        const totalClosedWorkDoneLastWeek = taskClosedLastSevenDays.reduce(
            (acc, curr) => {
                return (
                    acc + getTimeDifference(curr.updatedAt, curr.timeToComplete)
                );
            },
            0
        );
        const totalWorkInDays = tasks.reduce((acc, curr) => {
            return acc + getTimeDifference(curr.createdAt, curr.timeToComplete);
        }, 0);

        const data = {
            labels: ["Work Report for Last Week"],
            datasets: [
                {
                    label: "Total Work",
                    data: [totalWorkInDays],
                    backgroundColor: ["rgba(136, 253, 220, 0.4)"],
                    borderColor: ["rgba(136, 253, 220, 1)"],
                },
                {
                    label: "Work Done Last week",
                    data: [totalClosedWorkDoneLastWeek],
                    backgroundColor: ["rgba(226, 255, 99, 0.4)"],
                    borderColor: ["rgba(226, 255, 99, 1)"],
                },
            ],
        };
        setWorkDoneLastWeekChart(data);
    };
    const calculateOpenedAndClosedTaskReport = () => {
        if (!tasks || tasks.length === 0) return;
        const taskClosed = tasks.filter((task) => {
            if (task.status === "Completed") return task;
        });
        const taskOpened = tasks.filter((task) => task.status !== "Completed");

        const data = {
            labels: ["Total Tasks", "Tasks Closed", "Tasks Opened"],
            datasets: [
                {
                    label: "No. of Tasks",
                    data: [tasks.length, taskClosed.length, taskOpened.length],
                    backgroundColor: [
                        "rgba(120, 171, 248, 0.4)",
                        "rgba(99, 255, 128, 0.4)",
                        "rgba(255, 122, 99, 0.4)",
                    ],
                    borderColor: [
                        "rgba(120, 171, 248, 1)",
                        "rgba(99, 255, 128, 1)",
                        "rgba(255, 122, 99, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        };
        setTaskStatus(data);
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
        calculateOpenedAndClosedTaskReport();
    }, [tasks]);

    const optionsPendingWork = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: false,
                text: "Pending Work Report",
            },
        },
    };
    const optionsCompletedWork = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: false,
                text: "Work Completed Last Week Report",
            },
        },
    };
    const optionsDoughnut = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Task Report",
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
                <div className="row">
                    <div className="col-md-6">
                        {workPendingChart.labels.length > 0 && (
                            <Bar
                                options={optionsPendingWork}
                                data={workPendingChart}
                            />
                        )}
                    </div>
                    <div className="col-md-6">
                        {workDoneLastWeekChart.labels.length > 0 && (
                            <Bar
                                options={optionsCompletedWork}
                                data={workDoneLastWeekChart}
                            />
                        )}
                    </div>
                    <div className="col-md-6">
                        {taskStatusChart.labels.length > 0 && (
                            <Doughnut
                                options={optionsDoughnut}
                                data={taskStatusChart}
                            />
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
