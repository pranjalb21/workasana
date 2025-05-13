import { useState } from "react";
import { SiNginxproxymanager } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useData } from "../contexts/Application.context";

export default function LoginForm() {
    const navigate = useNavigate();
    const { login } = useData();
    const defaultData = {
        email: "",
        password: "",
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
        if (!formData.password || formData.password.length < 5) {
            inputError.password = "Password should be atleast 5 characters.";
        }

        setErrors(inputError);
        return Object.keys(inputError).length;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({});
        if (!validateInput()) {
            const status = await login(formData);
            if (status) {
                navigate("/");
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 w-100">
            <div
                style={{ maxWidth: "400px", width: "100%" }}
                className="border rounded shadow-sm bg-light p-4"
            >
                <form onSubmit={handleSubmit} className="">
                    <div className="text-center fs-2">
                        <SiNginxproxymanager />
                    </div>
                    <h4 className="text-center text-success">workasana</h4>
                    <h5 className="text-center fs-5">Log in to your account</h5>
                    <p className="text-center ">
                        <small>Please enter your details</small>
                    </p>
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
                        Log In
                    </button>
                </form>
                <p className="text-center mt-2">
                    <small>
                        Don't have an account?{" "}
                        <Link className="text-success" to={"/signup"}>
                            Create account
                        </Link>{" "}
                    </small>
                </p>
            </div>
        </div>
    );
}
