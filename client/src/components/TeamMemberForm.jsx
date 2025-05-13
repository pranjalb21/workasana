import React, { useEffect, useState } from "react";
import { useData } from "../contexts/Application.context";
import { useNavigate } from "react-router-dom";

export default function TeamMemberForm({
    setShowTeamMemberForm,
    selectedTeam,
    setSelectedTeam,
}) {
    const navigate = useNavigate();
    const defaultData = {
        members: [],
    };
    const { users, loadUsers, updateTeam } = useData();
    const [formData, setFormData] = useState(defaultData);
    const [errors, setErrors] = useState({});
    const [nonExistingUsers, setNonExistingUsers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([""]);

    const validateInput = () => {
        const inputError = {};
        if (!formData.members || formData.members.length < 1) {
            inputError.members = "Please provide a team member name.";
        }

        setErrors(inputError);
        return Object.keys(inputError).length;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateInput()) {
            const existingUserIDs = selectedTeam.members.map(
                (member) => member._id
            );
            const data = {
                ...selectedTeam,
                members: [...existingUserIDs, ...formData.members],
            };
            // console.log(data);

            const updatedTeam = await updateTeam(selectedTeam.name, data);
            if (updatedTeam) {
                setShowTeamMemberForm(false);
                setSelectedTeam(updatedTeam)
            }
        }
    };

    const addMoreMembers = () => {
        if (selectedMembers?.length < nonExistingUsers?.length) {
            setSelectedMembers((prev) => [...prev, ""]);
        }
    };

    const loadExistingUsers = async () => {
        const existingUserIDs = selectedTeam?.members?.map(
            (member) => member._id
        );
        const newNonExistingUsers = users?.filter(
            (user) => !existingUserIDs.includes(user._id)
        );
        setNonExistingUsers(newNonExistingUsers);
    };

    const handleMemberChange = (index, value) => {
        const newMemberList = [...selectedMembers];
        newMemberList[index] = value;
        const memberIDs = newMemberList.filter((member) => member !== "");
        setFormData((prev) => ({ ...prev, members: memberIDs }));
        setSelectedMembers(newMemberList);
    };

    const getUnselectedUsers = (selectIndex) => {
        const selectedExceptCurrent = selectedMembers.filter(
            (_, i) => i !== selectIndex && selectedMembers[i] !== ""
        );
        return nonExistingUsers?.filter(
            (user) =>
                // Include if the user is not selected in another select,
                // or if it is the currently selected option in the current select.
                !selectedExceptCurrent.includes(user._id) ||
                selectedMembers[selectIndex] === user._id
        );
    };
    useEffect(() => {
        loadUsers();
    }, []);
    useEffect(() => {
        loadExistingUsers();
    }, [selectedTeam, users]);
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
                        <div>
                            <h5 className="text-center fs-5 text-success">
                                Add new member
                            </h5>
                        </div>
                        <p className="text-center ">
                            <small>Please enter the following detail</small>
                        </p>
                        <div className="mb-2">
                            <div className="d-flex mb-2">
                                <label htmlFor="member" className="form-label">
                                    Select members
                                </label>
                                <button
                                    className="btn btn-outline-primary btn-sm ms-auto"
                                    onClick={addMoreMembers}
                                    type="button"
                                >
                                    + Add more
                                </button>
                            </div>
                            {selectedMembers.map((member, index) => (
                                <div className="mb-2" key={index}>
                                    <select
                                        name="members"
                                        id="members"
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
                                            Select Member
                                        </option>
                                        {getUnselectedUsers(index)?.map(
                                            (user) => (
                                                <option
                                                    key={user._id}
                                                    value={user._id}
                                                >
                                                    {user.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            ))}
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
