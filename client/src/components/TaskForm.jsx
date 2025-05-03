import React, { useState } from "react";

export default function TaskForm({ setShowTask }) {
    const defaultData = {
        name: "",
        project: "",
        team: "",
        owners: [],
        tags: [],
        timeToComplete: "",
    };
    const [formData, setFormData] = useState(defaultData);
    const [errors, setErrors] = useState({});

    const validateInput = () => {
        const inputError = {};
        if (!formData.name || !formData.name.length >= 1) {
            inputError.name = "Please provide a task name.";
        }
        if (!formData.team || !formData.team.length >= 1) {
            inputError.team = "Please select a team.";
        }
        if (!formData.project || !formData.project.length >= 1) {
            inputError.project = "Please select a project.";
        }
        if (!formData.owners || !formData.owners.length >= 1) {
            inputError.owners = "Please select atleast one owner.";
        }
        if (!formData.tags || !formData.tags.length >= 1) {
            inputError.tags = "Please select atleast one tag.";
        }
        if (!formData.timeToComplete) {
            inputError.timeToComplete = "Please a completion date.";
        }
        console.log(inputError);

        setErrors(inputError);
        return Object.keys(inputError).length;
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        validateInput();
    };

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
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        }))
                                    }
                                >
                                    <option value="">Select Project</option>
                                    <option value="hi">Hi</option>
                                    <option value="hello">hello</option>
                                    <option value="bye">bye</option>
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
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        }))
                                    }
                                >
                                    <option value="">Select Team</option>
                                    <option value="hi">Hi</option>
                                    <option value="hello">hello</option>
                                    <option value="bye">bye</option>
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
                                    <option value="hi">Hi</option>
                                    <option value="hello">hello</option>
                                    <option value="bye">bye</option>
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
                                    <option value="hi">Hi</option>
                                    <option value="hello">hello</option>
                                    <option value="bye">bye</option>
                                </select>
                                {errors.tags && (
                                    <p className="text-danger m-0">
                                        * <small>{errors.tags}</small>
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-6 mb-2">
                                <label
                                    htmlFor="timeToComplete"
                                    className="form-label"
                                >
                                    Estimate date of completion
                                </label>
                                <input
                                    type="date"
                                    name="timeToComplete"
                                    id="timeToComplete"
                                    className="form-control"
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
                            <div className="col-md-6 mb-2"></div>
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
