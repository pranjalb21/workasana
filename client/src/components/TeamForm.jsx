import React, { useEffect, useState } from "react";
import { useData } from "../contexts/application.context";
import { base_url } from "../constants/constants";
import { toast } from "react-toastify";
import { getHeader } from "../auth/addHeader";

export default function TeamForm({ setShowTeamForm }) {
    const { setLoading, addTeam } = useData();
    const defaultData = {
        description: "",
        name: "",
        members: [],
    };
    const [formData, setFormData] = useState(defaultData);
    const [errors, setErrors] = useState({});
    const [selectedMembers, setSelectedMembers] = useState([""]);

    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${base_url}/auth`, {
                headers: getHeader(),
            });
            if (!response.ok) {
                toast.error("Something went wrong.");
            }
            const data = await response.json();
            setUsers(data.data);
        } catch (error) {
            console.log("Signup error", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const validateInput = () => {
        const inputError = {};
        // console.log(formData);

        if (!formData.name || formData.name.length < 1) {
            inputError.name = "Team name is required.";
        }
        if (!formData.members || formData.members.length < 1) {
            inputError.members = "Atleast one team member is required.";
        }
        // console.log(inputError);
        setErrors(inputError);
        return Object.keys(inputError).length;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({});
        if (!validateInput()) {
            const result = await addTeam(formData);
            if (result) {
                setShowTeamForm(false);
            }
        }
    };

    // Called when "+ Add more" button is clicked.
    const addMoreMember = () => {
        if (selectedMembers.length < users.length) {
            setSelectedMembers([...selectedMembers, ""]);
        }
    };

    // Update a specific select when its value changes.
    const handleMemberChange = (index, value) => {
        const newSelectedMembers = [...selectedMembers];
        newSelectedMembers[index] = value;
        const memberIds = newSelectedMembers
            .filter((member) => member !== "")
            .map((person) => person);
        setSelectedMembers(newSelectedMembers);
        setFormData((prev) => ({ ...prev, members: memberIds }));
    };

    // Filter options for a particular select so users not already chosen in other selects appear,
    // but keep the current value even if it is already selected.
    const getFilteredUsers = (selectIndex) => {
        const selectedExceptCurrent = selectedMembers.filter(
            (_, i) => i !== selectIndex && selectedMembers[i] !== ""
        );
        return users.filter(
            (user) =>
                // Include if the user is not selected in another select,
                // or if it is the currently selected option in the current select.
                !selectedExceptCurrent.includes(user._id) ||
                selectedMembers[selectIndex] === user._id
        );
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
                                    Select member
                                </label>
                                <button
                                    className="btn btn-outline-primary btn-sm ms-auto"
                                    onClick={addMoreMember}
                                    type="button"
                                >
                                    + Add more
                                </button>
                            </div>

                            {selectedMembers.map((member, index) => (
                                <div key={index} className="mb-2">
                                    <select
                                        name="members"
                                        id={`members-${index}`}
                                        className="form-select"
                                        value={member}
                                        onChange={(e) =>
                                            handleMemberChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="" disabled>
                                            Select Team Member
                                        </option>
                                        {getFilteredUsers(index).map((user) => (
                                            <option
                                                key={user._id}
                                                value={user._id}
                                            >
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                    {/* Optionally show error for the first select or conditionally for all */}
                                    {errors.members && index === 0 && (
                                        <p className="text-danger">
                                            * <small>{errors.members}</small>
                                        </p>
                                    )}
                                </div>
                            ))}
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
