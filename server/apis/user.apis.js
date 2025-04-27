import User from "../models/user.models.js";
import generateError from "../utils/generateError.js";
import loginSchema from "../utils/validators/login.validator.js";
import jwt from "jsonwebtoken";
import signUpSchema from "../utils/validators/signUp.validator.js";
import { comparePassword } from "../utils/passwordOperations.js";

export const userLogin = async (req, res) => {
    try {
        // Validate the credentials
        const parsedData = loginSchema.parse(req.body);
        // console.log(parsedData);

        // Check if user exists in DB
        const user = await User.findOne({ email: parsedData.email });
        if (!user) {
            return res.status(400).json({ error: "User not found." });
        }

        // Check if password matches existing password
        const isPasswordValid = await comparePassword(
            parsedData.password,
            user.password
        );
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });
        // console.log(token);

        // Return login response
        return res
            .status(200)
            .json({ message: "LogIn successfull.", token, data: user });
    } catch (error) {
        // Combine all errors in an array
        const errors = generateError(error);

        // Return error response
        return res.status(500).json({
            error: "Error occured while login.",
            errors,
        });
    }
};

export const userSignUp = async (req, res) => {
    try {
        // Validate the data provided by user
        const parsedData = signUpSchema.parse(req.body);

        // Check if there is any existing user with email ID
        const isUserExists = await User.findOne({ email: parsedData.email });
        if (isUserExists) {
            return res.status(409).json({ error: "Email already exists." });
        }

        // Create new user
        const newUser = await User.create(parsedData);

        // Generate JWT token
        const token = jwt.sign(
            { email: newUser.email },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h",
            }
        );

        // Return response with newly created user
        return res.status(201).json({
            message: "User created successfully.",
            token,
            data: newUser,
        });
    } catch (error) {
        // Combine all errors in an array
        const errors = generateError(error);

        // Return error response
        return res.status(500).json({
            error: "Error occured while login.",
            errors,
        });
    }
};

export const getUserByToken = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        return res
            .status(200)
            .json({ message: "User fetched successfully.", data: user });
    } catch (err) {
        // Return error response
        return res.status(500).json({
            error: "Error occured while login.",
            details: err.message,
        });
    }
};
