import React from "react";
import { SiNginxproxymanager } from "react-icons/si";
import { NavLink } from "react-router-dom";

export default function Logo() {
    return (
        <NavLink to={"/"} style={{textDecoration:"none"}}>
            <div
                className="d-flex align-items-center justify-content-center"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Home"
                style={{ cursor: "pointer" }}
            >
                <span className="text-success-emphasis fs-3 d-inline-block py-3 me-1">
                    <SiNginxproxymanager />
                </span>{" "}
                <h4 className="fs-4 text-center py-3 d-md-block d-none m-0">
                    workasana
                </h4>
            </div>
        </NavLink>
    );
}
