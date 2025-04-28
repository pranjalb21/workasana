import Project from "../models/Project.models.js";
import generateError from "../utils/generateError.js";
import teamSchema from "../utils/validators/team.validator.js";

export const createProject = async (req, res) => {
    try {
        const parsedData = teamSchema.parse(req.body);
        const newProject = await Project.create(parsedData);
        res.status(201).json({
            message: "Project created successfully.",
            data: newProject,
        });
    } catch (error) {
        // Combine all errors in an array
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
