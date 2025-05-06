import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useData } from "../contexts/application.context";
const profileDetails = {
    id: 1,
    name: "John Doe",
    email: "test@email.com",
    password: "abcde",
};
export default function ProfileForm() {
    const {user}=useData()
    const [profile, setProfile] = useState(user);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const validateForm = () => {
        const validationError = {};
        if (!profile.name || profile.name === "") {
            validationError.name = "Name cannot be empty.";
        }
        if (!profile.email || profile.email === "") {
            validationError.email = "Please enter an email address.";
        }
        if (!profile.password || profile.password === "") {
            validationError.password = "Please enter a password.";
        }
        if (profile.password.length < 5) {
            validationError.password =
                "Password length should be atleast 5 characters.";
        }
        setErrors(validationError);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        validateForm();
    };
    return (
        <div
            style={{
                maxWidth: "50rem",
                minWidth: "25rem",
                maxHeight: "40rem",
            }}
            className="bg-light border py-4 px-5 shadow-sm rounded"
        >
            <p className="fs-4 m-0 text-end">
                Welcome{" "}
                <span className="fs-3 fw-medium">{profileDetails.name}</span>
            </p>
            <hr className="m-1" />
            <section className="px-2">
                <p className="fs-5 fw-fw-semibold">Profile Details</p>
                {/* <hr /> */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            value={profile.name}
                            onChange={(e) =>
                                setProfile((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                        />
                        {errors.name && (
                            <p className="text-danger m-0">
                                * <small>{errors.name}</small>
                            </p>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="form-label">
                            Email Address
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="form-control"
                            value={profile.email}
                            onChange={(e) =>
                                setProfile((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                        />
                        {errors.email && (
                            <p className="text-danger m-0">
                                * <small>{errors.email}</small>
                            </p>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <div className="position-relative">
                            <input
                                type={`${showPassword ? "text" : "password"}`}
                                name="password"
                                id="password"
                                className="form-control"
                                value={profile.password}
                                onChange={(e) =>
                                    setProfile((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value,
                                    }))
                                }
                            />
                            <span>
                                {!showPassword ? (
                                    <FaEye
                                        className="showPassword"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                    />
                                ) : (
                                    <FaEyeSlash
                                        className="showPassword"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                    />
                                )}
                            </span>
                            {errors.password && (
                                <p className="text-danger m-0">
                                    * <small>{errors.password}</small>
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mb-2">
                        <button className="btn btn-outline-primary btn-sm">
                            Update
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
