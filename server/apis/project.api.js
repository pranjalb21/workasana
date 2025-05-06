import mongoose from "mongoose";
import Project from "../models/project.model.js";
import generateError from "../utils/generateError.js";
import teamSchema from "../utils/validators/team.validator.js";
import projectSchema from "../utils/validators/project.validator.js";

export const createProject = async (req, res) => {
    try {
        req.body.owner = req.user._id;
        req.body.status = "In Progress";
        const parsedData = projectSchema.parse(req.body);
        const newProject = await Project.create(parsedData);
        res.status(201).json({
            message: "Project created successfully.",
            data: newProject,
        });
    } catch (error) {
        // Combine all errors in an array
        console.log(error);

        const errors = generateError(error);

        // Return error response
        return res.status(500).json({
            error: "Error occured while creating project.",
            message: errors,
        });
    }
};

export const getProjects = async (req, res) => {
    try {
        const teams = await Project.find();
        res.status(200).json({
            message: "Projects fetched successfully.",
            data: teams,
        });
    } catch (error) {
        // Return error response
        return res.status(500).json({
            error: "Error occured while fetching projects.",
            message: error.message,
        });
    }
};
