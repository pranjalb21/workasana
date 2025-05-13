import { useEffect, useState } from "react";
import { useData } from "../contexts/Application.context";
import { base_url, priorityList, statusList } from "../constants/Constants";

export default function TaskForm({ setShowTask, selectedProject }) {
    const defaultData = {
        name: "",
        project: selectedProject ? selectedProject._id : "",
        team: "",
        owners: [],
        tags: [],
        timeToComplete: "",
        status: "",
        priority: "",
    };
    const [formData, setFormData] = useState(defaultData);
    const [errors, setErrors] = useState({});
    const {
        users,
        teams,
        loadTeams,
        loadUsers,
        projects,
        loadProjects,
        tags,
        loadTags,
        addTask,
    } = useData();

    const validateInput = () => {
        const inputError = {};
        if (!formData.name || formData.name.length < 1) {
            inputError.name = "Please provide a task name.";
        }
        if (!formData.team || formData.team.length < 1) {
            inputError.team = "Please select a team.";
        }
        if (!formData.project || formData.project.length < 1) {
            inputError.project = "Please select a project.";
        }
        if (!formData.owners || formData.owners.length < 1) {
            inputError.owners = "Please select atleast one owner.";
        }
        if (!formData.tags || formData.tags.length < 1) {
            inputError.tags = "Please select atleast one tag.";
        }
        if (!formData.status) {
            inputError.status = "Please select task status.";
        }
        if (!formData.priority || formData.priority < 1) {
            inputError.priority = "Please select task priority.";
        }
        const days = calculateDaysFromToday(formData.timeToComplete);
        if (!formData.timeToComplete || days < 1) {
            inputError.timeToComplete = "Past date is not acceptable.";
        }
        setErrors(inputError);
        return Object.keys(inputError).length;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateInput()) {
            const result = await addTask(formData);
            if (result) {
                setShowTask(false);
            }
        }
    };
    const calculateDaysFromToday = (givenDateStr) => {
        const today = new Date();
        const givenDate = new Date(givenDateStr);

        const timeDifference = givenDate - today;
        const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        return dayDifference;
    };

    const loadData = async () => {
        await loadUsers();
        await loadProjects(`${base_url}/projects`);
        await loadTeams();
        await loadTags();
    };
    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="projectForm">
            <div className="d-flex justify-content-center align-items-center vh-100 w-100">
                <div
                    style={{
                        maxWidth: "550px",
                        width: "100%",
                        maxHeight: "35rem",
                    }}
                    className="border rounded shadow-sm bg-light p-4 position-relative overflow-y-auto"
                >
                    <form onSubmit={handleSubmit} className="">
                        {/* <h4 className="text-center text-success">workasana</h4> */}
                        <button
                            type="button"
                            className="btn-close position-absolute end-0 me-4"
                            aria-label="Close"
                            onClick={() => setShowTask((prev) => !prev)}
                        ></button>
                        <h5 className="text-center fs-5 text-success">
                            Add a new task
                        </h5>
                        <p className="text-center ">
                            <small>Please enter the following details</small>
                        </p>
                        <div className="mb-2">
                            <label htmlFor="name" className="form-label">
                                Task Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="Enter task name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    }))
                                }
                            />
                            {errors.name && (
                                <p className="text-danger m-0">
                                    * <small>{errors.name}</small>
                                </p>
                            )}
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">
                                    Select Project
                                </label>
                                <select
                                    name="project"
                                    id="project"
                                    className="form-select"
                                    value={
                                        selectedProject
                                            ? selectedProject._id
                                            : formData.project
                                    }
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        }))
                                    }
                                    disabled={selectedProject ? true : false}
                                >
                                    <option value="">Select Project</option>
                                    {projects &&
                                        projects?.map((project) => (
                                            <option
                                                value={project._id}
                                                key={project._id}
                                            >
                                                {project.name}
                                            </option>
                                        ))}
                                </select>
                                {errors.project && (
                                    <p className="text-danger m-0">
                                        * <small>{errors.project}</small>
                                    </p>
                                )}
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">
                                    Select Team
                                </label>
                                <select
                                    name="team"
                                    id="team"
                                    className=" form-select"
                                    value={formData.team}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        }))
                                    }
                                >
                                    <option value="">Select Team</option>
                                    {teams &&
                                        teams?.map((team) => (
                                            <option
                                                value={team._id}
                                                key={team._id}
                                            >
                                                {team.name}
                                            </option>
                                        ))}
                                </select>
                                {errors.team && (
                                    <p className="text-danger m-0">
                                        * <small>{errors.team}</small>
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-6 mb-2">
                                <label htmlFor="owners" className="form-label">
                                    Owners
                                </label>
                                <select
                                    name="owners"
                                    id="owners"
                                    multiple
                                    className="form-select"
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            [e.target.name]: Array.from(
                                                e.target.selectedOptions,
                                                (option) => option.value
                                            ),
                                        }))
                                    }
                                >
                                    {users &&
                                        users?.map((user) => (
                                            <option
                                                value={user._id}
                                                key={user._id}
                                            >
                                                {user.name}
                                            </option>
                                        ))}
                                </select>
                                {errors.owners && (
                                    <p className="text-danger m-0">
                                        * <small>{errors.owners}</small>
                                    </p>
                                )}
                            </div>
                            <div className="col-md-6 mb-2">
                                <label htmlFor="tags" className="form-label">
                                    Tags
                                </label>
                                <select
                                    name="tags"
                                    id="tags"
                                    multiple
                                    className="form-select"
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            [e.target.name]: Array.from(
                                                e.target.selectedOptions,
                                                (option) => option.value
                                            ),
                                        }))
                                    }
                                >
                                    {tags &&
                                        tags?.map((tag) => (
                                            <option
                                                value={tag._id}
                                                key={tag._id}
                                            >
                                                {tag.name}
                                            </option>
                                        ))}
                                </select>
                                {errors.tags && (
                                    <p className="text-danger m-0">
                                        * <small>{errors.tags}</small>
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-4 mb-2">
                                <label
                                    htmlFor="timeToComplete"
                                    className="form-label"
                                >
                                    Completion Date
                                </label>
                                <input
                                    type="date"
                                    name="timeToComplete"
                                    id="timeToComplete"
                                    className="form-control"
                                    value={formData.timeToComplete}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        }))
                                    }
                                />
                                {errors.timeToComplete && (
                                    <p className="text-danger m-0">
                                        * <small>{errors.timeToComplete}</small>
                                    </p>
                                )}
                            </div>
                            <div className="col-md-4 mb-2">
                                <label htmlFor="name" className="form-label">
                                    Select Status
                                </label>
                                <select
                                    name="status"
                                    id="status"
                                    className="form-select"
                                    value={formData.status}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        }))
                                    }
                                >
                                    <option value="" disabled>
                                        Select Status
                                    </option>
                                    {statusList?.map((status) => (
                                        <option value={status} key={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                                {errors.status && (
                                    <p className="text-danger m-0">
                                        * <small>{errors.status}</small>
                                    </p>
                                )}
                            </div>
                            <div className="col-md-4 mb-2">
                                <label htmlFor="name" className="form-label">
                                    Select Priority
                                </label>
                                <select
                                    name="priority"
                                    id="priority"
                                    className="form-select"
                                    value={formData.priority}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            [e.target.name]: +e.target.value,
                                        }))
                                    }
                                >
                                    <option value="" disabled>
                                        Select Priority
                                    </option>
                                    {priorityList?.map((priority) => (
                                        <option
                                            value={priority.value}
                                            key={priority.value}
                                        >
                                            {priority.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.priority && (
                                    <p className="text-danger m-0">
                                        * <small>{errors.priority}</small>
                                    </p>
                                )}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Add Task
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
