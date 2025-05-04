import React, { useState } from "react";

export default function TeamMemberForm({ setShowTeamMemberForm }) {
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
            inputError.name = "Please provide a team member name.";
        }

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
                            onClick={() => setShowTeamMemberForm(false)}
                        ></button>
                        <h5 className="text-center fs-5 text-success">
                            Add new member
                        </h5>
                        <p className="text-center ">
                            <small>Please enter the following detail</small>
                        </p>
                        <div className="mb-2">
                            <label htmlFor="name" className="form-label">
                                Member Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="Enter team member name"
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
                        <button type="submit" className="btn btn-primary w-100">
                            Add Member
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
