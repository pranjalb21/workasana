import React from "react";

export default function Loader() {
    return (
        <div className="loadingContainer">
            <div
                className="spinner-border  text-success"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}
