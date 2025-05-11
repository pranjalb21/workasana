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

export const getOwnProjects = async (req, res) => {
    try {
        const { project_status, keyword } = req.query;
        const filter = { owner: req.user._id };
        if (project_status) filter.status = project_status;
        if (keyword) filter.name = { $regex: keyword, $options: "i" };

        const projects = await Project.find(filter);

        res.status(200).json({
            message: "Projects fetched successfully.",
            data: projects,
        });
    } catch (error) {
        // Return error response
        return res.status(500).json({
            error: "Error occured while fetching own projects.",
            message: error.message,
        });
    }
};

export const getProjects = async (req, res) => {
    try {
        const { project_status } = req.query;
        const filter = {};
        if (project_status) filter.status = project_status;
        const projects = await Project.find(filter);
        res.status(200).json({
            message: "Projects fetched successfully.",
            data: projects,
        });
    } catch (error) {
        // Return error response
        return res.status(500).json({
            error: "Error occured while fetching projects.",
            message: error.message,
        });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const { projectId } = req.params;
        const teams = await Project.findById(projectId);
        res.status(200).json({
            message: "Project fetched successfully.",
            data: teams,
        });
    } catch (error) {
        // Return error response
        return res.status(500).json({
            error: "Error occured while fetching project.",
            message: error.message,
        });
    }
};

export const updateProjectStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { projectId } = req.params;

        if (!(status === "In Progress" || status === "Completed")) {
            return res.status(400).json({ error: "Invalid project status." });
        }
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: "Project not found." });
        }
        project.status = status;
        await project.save();
        res.status(200).json({
            message: "Project status updated successfully.",
            data: project,
        });
    } catch (error) {
        // Return error response
        return res.status(500).json({
            error: "Error occured while updating project status.",
            message: error.message,
        });
    }
};
