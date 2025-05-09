import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink, useSearchParams } from "react-router-dom";
import TeamMemberForm from "../components/TeamMemberForm";
import { useData } from "../contexts/application.context";
import { generateNameKeyword, loadColors } from "../constants/constants";

export default function TeamDetails() {
    const [searchParams, setSearchParams] = useSearchParams();
    const teamName = searchParams.get("teamName");

    const { getTeamByName } = useData();
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
    useEffect(() => {
        loadTeam();
    }, []);
    useEffect(() => {
        loadColors();
    }, [selectedTeam]);

    return (
        <Layout>
            {showTeamMemberForm && (
                <TeamMemberForm setShowTeamMemberForm={setShowTeamMemberForm} />
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
                                    {member.name}
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
