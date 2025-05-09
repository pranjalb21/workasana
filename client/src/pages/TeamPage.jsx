import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TeamForm from "../components/TeamForm";
import { NavLink } from "react-router-dom";
import { useData } from "../contexts/application.context";

const task = [
    { id: 11, name: "John Doe" },
    { id: 12, name: "Smith John" },
];
export default function TeamPage() {
    const [showTeamForm, setShowTeamForm] = useState(false);
    const { teams, loadTeams } = useData();
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
        document.querySelectorAll(".namecard").forEach((pill) => {
            let bgColor = getRandomColor();
            pill.style.backgroundColor = bgColor;
            pill.style.color = getTextColor(bgColor); // Ensures contrast
        });
    };
    useEffect(() => {
        loadTeams();
    }, []);
    useEffect(() => {
        loadColors();
    }, [teams]);
    const generateNameKeyword = (name) => {
        const nameArray = name?.split(" ");
        let nameKeyword =
            nameArray[0][0].toUpperCase() +
            nameArray[nameArray.length - 1][0].toUpperCase();
        return nameKeyword;
    };
    return (
        <Layout>
            <div className="container py-5 px-4">
                {showTeamForm && <TeamForm setShowTeamForm={setShowTeamForm} />}
                <div className="d-flex">
                    <h3 className="fs-3">Teams</h3>
                    <button
                        className="btn btn-primary btn-sm ms-auto"
                        onClick={() => setShowTeamForm(true)}
                    >
                        + New Team
                    </button>
                </div>{" "}
                <div className="row mt-4">
                    {teams &&
                        teams?.map((team) => (
                            <div className="col-md-4 mb-4" key={team._id}>
                                <div className="card bg-light">
                                    <NavLink
                                        className="text-decoration-none"
                                        to={`/teamdetails?teamName=${team.name}`}
                                    >
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {team.name}
                                                <span>&rarr;</span>
                                            </h5>
                                            <ul className="namecard-container">
                                                {team?.members?.map(
                                                    (member) => (
                                                        <li
                                                            className="namecard"
                                                            key={member?._id}
                                                        >
                                                            {generateNameKeyword(
                                                                member?.name
                                                            )}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </Layout>
    );
}
