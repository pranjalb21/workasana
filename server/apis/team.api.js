import mongoose from "mongoose";
import Team from "../models/team.model.js";
import generateError from "../utils/generateError.js";
import teamSchema from "../utils/validators/team.validator.js";
import User from "../models/user.model.js";

export const createTeam = async (req, res) => {
    try {
        const parsedData = teamSchema.parse(req.body);
        const isExistingTeam = await Team.findOne({ name: parsedData.name });
        if (isExistingTeam) {
            return res.status(409).json({ error: "Team name already exists." });
        }
        const newTeam = await Team.create(parsedData);
        await newTeam.populate("members");
        res.status(201).json({
            message: "Team created successfully.",
            data: newTeam,
        });
    } catch (error) {
        // Combine all errors in an array
        console.log(error.message);

        const errors = generateError(error);

        // Return error response
        return res.status(500).json({
            error: "Error occured while creating team.",
            message: errors,
        });
    }
};

export const getTeams = async (req, res) => {
    try {
        const teams = await Team.find().populate("members");
        res.status(200).json({
            message: "Teams fetched successfully.",
            data: teams,
        });
    } catch (error) {
        // Return error response
        return res.status(500).json({
            error: "Error occured while fetching teams.",
            message: error.message,
        });
    }
};

export const getTeamByName = async (req, res) => {
    try {
        const { teamName } = req.query;
        // console.log(teamName);

        const team = await Team.findOne({ name: teamName }).populate("members");
        // console.log(team);

        if (team) {
            return res.status(200).json({
                message: "Team details fetched successfully.",
                data: team,
            });
        } else {
            return res.status(404).json({
                error: "Team not found.",
            });
        }
    } catch (error) {
        // Return error response
        return res.status(500).json({
            error: "Error occured while fetching teams.",
            message: error.message,
        });
    }
};

export const updateTeam = async (req, res) => {
    try {
        const { teamName } = req.query;
        const parsedData = teamSchema.parse(req.body);
        // console.log(parsedData);

        parsedData.members.map(async (member) => {
            const isExistingUser = await User.findById(member);
            // console.log(isExistingUser);
            if (!isExistingUser) {
                return res.status(404).json({ error: "User not found." });
            }
        });
        const updatedTeams = await Team.findOneAndUpdate(
            { name: teamName },
            parsedData,
            { new: true }
        );
        // console.log(updatedTeams);

        await updatedTeams.populate("members");
        return res
            .status(201)
            .json({ message: "Team members updated.", data: updatedTeams });
    } catch (error) {
        // Return error response
        return res.status(500).json({
            error: "Error occured while fetching teams.",
            message: error.message,
        });
    }
};
