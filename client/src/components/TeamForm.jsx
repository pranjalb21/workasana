import React, { useState } from "react";

export default function TeamForm({ setShowTeamForm }) {
    const defaultData = {
        description: "",
        name: "",
        members: [],
    };
    const [formData, setFormData] = useState(defaultData);
    const [errors, setErrors] = useState({});
    const [members, setMembers] = useState([""]);

    const validateInput = () => {
        const inputError = {};
        console.log(formData);

        if (!formData.name || formData.name.length < 1) {
            inputError.name = "Team name is required.";
        }
        if (!formData.members || !formData.members.length >= 1) {
            inputError.members = "Atleast one team member is required.";
        }
        // console.log(inputError);
        setErrors(inputError);
        return Object.keys(inputError).length;
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({});
        // console.log(members);
        const newMembers = members.filter((m) => m !== "");
        setFormData((prev) => ({
            ...prev,
            members: newMembers,
        }));
        if (!validateInput()) {
            console.log(formData);
        }
    };

    const addMoreMember = () => {
        setMembers((prev) => [...prev, ""]);
    };

    return (
        <div className="projectForm">
            <div className="d-flex justify-content-center align-items-center vh-100 w-100">
                <div
                    style={{
                        maxWidth: "400px",
                        width: "100%",
                        maxHeight: "40rem",
                    }}
                    className="border rounded shadow-sm bg-light p-4 position-relative overflow-y-auto"
                >
                    <form className="">
                        {/* <h4 className="text-center text-success">workasana</h4> */}
                        <button
                            type="button"
                            className="btn-close position-absolute end-0 me-4"
                            aria-label="Close"
                            onClick={() => setShowTeamForm((prev) => !prev)}
                        ></button>
                        <h5 className="text-center fs-5 text-success">
                            Add a new Team
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
                                placeholder="Enter team name"
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
                                placeholder="Enter team description"
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
                        <div className="mb-3">
                            <div className="d-flex mb-2">
                                <label htmlFor="member" className="form-label">
                                    Add member
                                </label>
                                <button
                                    className="btn btn-outline-primary btn-sm ms-auto"
                                    onClick={addMoreMember}
                                    type="button"
                                >
                                    +Add more
                                </button>
                            </div>
                            {members.map((member, index) => (
                                <select
                                    name="member"
                                    id="member"
                                    className="form-select mb-2"
                                    key={index}
                                    onChange={(e) => {
                                        const newTeamMembers = [...members];
                                        newTeamMembers[index] = e.target.value;
                                        setMembers(newTeamMembers);
                                    }}
                                    value={member}
                                >
                                    <option value="" disabled>
                                        Select team member
                                    </option>
                                    <option value="hi">Hi</option>
                                </select>
                            ))}
                            {errors.members && (
                                <p className="text-danger">
                                    * <small>{errors.members}</small>
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-sm"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
