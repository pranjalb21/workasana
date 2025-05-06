import React, { useState } from "react";
import { base_url } from "../constants/constants";
import { getHeader } from "../auth/addHeader";
import { useData } from "../contexts/application.context";

export default function ProjectForm({ setShowProject }) {
    const { addProject } = useData();
    const defaultData = {
        description: "",
        name: "",
    };
    const [formData, setFormData] = useState(defaultData);
    const [errors, setErrors] = useState({});

    const validateInput = () => {
        const inputError = {};
        if (!formData.description || formData.description.length < 1) {
            inputError.description = "Please provide project description.";
        }
        if (!formData.name || !formData.name.length >= 5) {
            inputError.name = "Project name is required.";
        }
        setErrors(inputError);
        return Object.keys(inputError).length;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({});
        if (!validateInput()) {
            const result = await addProject(formData);
            if (result) {
                setShowProject(false);
            }
        }
    };

    return (
        <div className="projectForm">
            <div className="d-flex justify-content-center align-items-center vh-100 w-100">
                <div
                    style={{ maxWidth: "400px", width: "100%" }}
                    className="border rounded shadow-sm bg-light p-4 position-relative"
                >
                    <form onSubmit={handleSubmit} className="">
                        {/* <h4 className="text-center text-success">workasana</h4> */}
                        <button
                            type="button"
                            className="btn-close position-absolute end-0 me-4"
                            aria-label="Close"
                            onClick={() => setShowProject((prev) => !prev)}
                        ></button>
                        <h5 className="text-center fs-5 text-success">
                            Add a new project
                        </h5>
                        <p className="text-center ">
                            <small>Please enter the following details</small>
                        </p>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="Enter project name"
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    }))
                                }
                            />
                            {errors.name && (
                                <p className="text-danger">
                                    * <small>{errors.name}</small>
                                </p>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Description
                            </label>
                            <textarea
                                className="form-control"
                                placeholder="Enter project description"
                                name="description"
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    }))
                                }
                            />
                            {errors.description && (
                                <p className="text-danger">
                                    * <small>{errors.description}</small>
                                </p>
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Add Project
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
