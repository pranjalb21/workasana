import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
    NavLink,
    useSearchParams,
} from "react-router-dom";
import TeamMemberForm from "../components/TeamMemberForm";
import { useData } from "../contexts/application.context";

export default function TeamDetails() {
    const [searchParams, setSearchParams] = useSearchParams();
    const teamName = searchParams.get("teamName");

    const { getTeamByName } = useData();
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [showTeamMemberForm, setShowTeamMemberForm] = useState(false);
    function getRandomColor() {
        return "#" + Math.floor(Math.random() * 16777215).toString(16); // Random hex color
    }

    function getTextColor(bgColor) {
        // Convert hex to RGB
        let r = parseInt(bgColor.substring(1, 3), 16);
        let g = parseInt(bgColor.substring(3, 5), 16);
        let b = parseInt(bgColor.substring(5, 7), 16);

        // Calculate luminance
        let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        // Choose black or white based on luminance
        return luminance > 0.5 ? "#000000" : "#FFFFFF";
    }

    const loadColors = () => {
        document.querySelectorAll(".namepill").forEach((pill) => {
            let bgColor = getRandomColor();
            pill.style.backgroundColor = bgColor;
            pill.style.color = getTextColor(bgColor); // Ensures contrast
        });
    };
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
    const generateNameKeyword = (name) => {
        const nameArray = name.split(" ");
        let nameKeyword = nameArray[0][0] + nameArray[nameArray.length - 1][0];
        return nameKeyword;
    };
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
