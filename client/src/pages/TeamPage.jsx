import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TeamForm from "../components/TeamForm";

const task = [
    { id: 11, name: "John Doe" },
    { id: 12, name: "Smith John" },
];
export default function TeamPage() {
    const [showTeamForm, setShowTeamForm] = useState(false);
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
        loadColors();
    }, []);
    const generateNameKeyword = (name) => {
        const nameArray = name.split(" ");
        let nameKeyword = nameArray[0][0] + nameArray[nameArray.length - 1][0];
        return nameKeyword;
    };
    return (
        <Layout>
            <div className="container py-5 px-3">
                {
                    showTeamForm && <TeamForm setShowTeamForm={setShowTeamForm} />
                }
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
                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Designing Team</h5>
                                <ul className="namecard-container">
                                    {task.map((owner) => (
                                        <li className="namecard" key={owner.id}>
                                            {generateNameKeyword(owner.name)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Designing Team</h5>
                                <ul className="namecard-container">
                                    {task.map((owner) => (
                                        <li className="namecard" key={owner.id}>
                                            {generateNameKeyword(owner.name)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Designing Team</h5>
                                <ul className="namecard-container">
                                    {task.map((owner) => (
                                        <li className="namecard" key={owner.id}>
                                            {generateNameKeyword(owner.name)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
