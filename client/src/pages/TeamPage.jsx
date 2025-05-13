import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TeamForm from "../components/TeamForm";
import { NavLink } from "react-router-dom";
import { useData } from "../contexts/Application.context";
import { generateNameKeyword, loadColors } from "../constants/Constants";

const task = [
    { id: 11, name: "John Doe" },
    { id: 12, name: "Smith John" },
];
export default function TeamPage() {
    const [showTeamForm, setShowTeamForm] = useState(false);
    const { teams, loadTeams } = useData();

    useEffect(() => {
        loadTeams();
    }, []);
    useEffect(() => {
        loadColors();
    }, [teams]);
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
                                        to={`/team-details?teamName=${team.name}`}
                                    >
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {team.name}
                                                <span>&rarr;</span>
                                            </h5>
                                            <ul
                                                className="name-container"
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                }}
                                            >
                                                {team?.members?.map(
                                                    (member, index) =>
                                                        index < 2 && (
                                                            <li
                                                                key={
                                                                    member?._id
                                                                }
                                                                style={{
                                                                    display:
                                                                        "inline-block",
                                                                    ...(index >
                                                                        -1 && {
                                                                        marginLeft:
                                                                            "-5px",
                                                                    }),
                                                                    height: "25px",
                                                                    width: "25px",
                                                                    borderRadius:
                                                                        "50%",
                                                                    textAlign:
                                                                        "center",
                                                                }}
                                                                className="namepill"
                                                            >
                                                                {generateNameKeyword(
                                                                    member?.name
                                                                )}
                                                            </li>
                                                        )
                                                )}
                                                {team?.members?.length > 2 && (
                                                    <li
                                                        style={{
                                                            display:
                                                                "inline-block",

                                                            marginLeft: "-5px",

                                                            height: "25px",
                                                            width: "25px",
                                                            borderRadius: "50%",
                                                            textAlign: "center",
                                                            fontSize: "0.9rem",
                                                        }}
                                                        className="namepill"
                                                    >
                                                        +
                                                        {team.members.length -
                                                            2}
                                                    </li>
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
