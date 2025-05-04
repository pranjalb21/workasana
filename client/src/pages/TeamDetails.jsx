import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { NavLink } from "react-router-dom";
import TeamMemberForm from "../components/TeamMemberForm";

const task = [
    { id: 11, name: "John Doe" },
    { id: 12, name: "Smith John" },
];
export default function TeamDetails() {
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
    useEffect(() => {
        loadColors();
    }, []);
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
                    <NavLink className="text-decoration-none" to={"/team"}>
                        &larr; Back
                    </NavLink>
                </p>

                <h3 className="fs-3">Team Name</h3>
                <p>
                    <small className="text-secondary fw-medium">MEMBERS</small>
                </p>
                <ul className="name-container">
                    {task.map((owner) => (
                        <li key={owner.id}>
                            <span className="namepill me-2">
                                {generateNameKeyword(owner.name)}
                            </span>
                            {owner.name}
                        </li>
                    ))}
                </ul>

                <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setShowTeamMemberForm(true)}
                >
                    + Add member
                </button>
            </section>
        </Layout>
    );
}
