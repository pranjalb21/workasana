import React, { useState } from "react";
import { SiNginxproxymanager } from "react-icons/si";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SignupForm() {
    const defaultData = {
        email: "",
        password: "",
        name: "",
    };
    const [formData, setFormData] = useState(defaultData);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const validateInput = () => {
        const inputError = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            inputError.email = "Please enter a valid email address.";
        }
        if (!formData.password || !formData.password.length >= 5) {
            inputError.password = "Password should be atleast 5 characters.";
        }
        if (!formData.name || !formData.name.length >= 1) {
            inputError.name = "Name is required.";
        }
        setErrors(inputError);
        return Object.keys(inputError).length;
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({});
        if (!validateInput()) {
            console.log(formData);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 w-100">
            <div
                style={{ maxWidth: "400px", width: "100%" }}
                className="border rounded shadow-sm bg-light p-4"
            >
                <form onSubmit={handleSubmit} className="">
                    <div className="text-center fs-2 ">
                        <SiNginxproxymanager />
                    </div>
                    <h4 className="text-center text-success">workasana</h4>
                    <h5 className="text-center fs-5">Create your account</h5>
                    <p className="text-center ">
                        <small>Please enter your details</small>
                    </p>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            placeholder="Enter your name"
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                        />
                        {errors.name && (
                            <p className="text-danger">
                                * <small>{errors.name}</small>
                            </p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter your email"
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                        />
                        {errors.email && (
                            <p className="text-danger">
                                * <small>{errors.email}</small>
                            </p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <div className="position-relative">
                            <input
                                type={`${showPassword ? "text" : "password"}`}
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter your password"
                                onChange={(e) =>
                                    setFormData((prev) => ({
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
                        </div>
                        {errors.password && (
                            <p className="text-danger">
                                * <small>{errors.password}</small>
                            </p>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Sign Up
                    </button>
                </form>
                <p className="text-center mt-2">
                    <small>
                        Already have an account?{" "}
                        <Link className="text-success" to={"/login"}>
                            Log In
                        </Link>{" "}
                    </small>
                </p>
            </div>
        </div>
    );
}
