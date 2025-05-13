import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink, useSearchParams } from "react-router-dom";
import TeamMemberForm from "../components/TeamMemberForm";
import { useData } from "../contexts/Application.context";
import { generateNameKeyword, loadColors } from "../constants/Constants";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function TeamDetails() {
    const [searchParams, setSearchParams] = useSearchParams();
    const teamName = searchParams.get("teamName");

    const { getTeamByName, updateTeam } = useData();
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [showTeamMemberForm, setShowTeamMemberForm] = useState(false);

    const loadTeam = async () => {
        // console.log(teamName);

        if (teamName) {
            const team = await getTeamByName(teamName);
            if (team) {
                setSelectedTeam(team);
            }
        }
    };
    const handleMemberDelete = async (memberId) => {
        const filteredMembers = selectedTeam.members
            .filter((member) => member._id !== memberId)
            .map((person) => person._id);
        // console.log(filteredMembers);
        const data = { ...selectedTeam, members: filteredMembers };
        const updatedTeam = await updateTeam(selectedTeam.name, data);
        if (updatedTeam) {
            setSelectedTeam(updatedTeam);
        }
    };
    useEffect(() => {
        loadTeam();
    }, []);
    useEffect(() => {
        loadColors();
    }, [selectedTeam]);

    return (
        <Layout>
            {showTeamMemberForm && (
                <TeamMemberForm
                    setShowTeamMemberForm={setShowTeamMemberForm}
                    selectedTeam={selectedTeam}
                    setSelectedTeam={setSelectedTeam}
                />
            )}
            <section className="container my-4 mx-5">
                <p className="back">
                    <NavLink
                        className="text-decoration-none backArrow"
                        to={"/team"}
                    >
                        <span>&larr;</span> Back
                    </NavLink>
                </p>

                {selectedTeam ? (
                    <>
                        <h3 className="fs-3">{selectedTeam.name}</h3>
                        <p>
                            <small className="text-secondary fw-medium">
                                MEMBERS
                            </small>
                        </p>
                        <ul className="name-container">
                            {selectedTeam.members.map((member) => (
                                <li key={member._id}>
                                    <span className="namepill me-2">
                                        {generateNameKeyword(member.name)}
                                    </span>
                                    {member.name}&nbsp;&nbsp;
                                    <span className="">
                                        <RiDeleteBin6Line
                                            className="deleteTeamMemberBtn"
                                            onClick={() =>
                                                handleMemberDelete(member._id)
                                            }
                                        />
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => setShowTeamMemberForm(true)}
                        >
                            + Add member
                        </button>
                    </>
                ) : (
                    <p>Team not found.</p>
                )}
            </section>
        </Layout>
    );
}
