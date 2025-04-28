import Team from "../models/team.models.js";
import generateError from "../utils/generateError.js";
import teamSchema from "../utils/validators/team.validator.js";

export const createTeam = async (req, res) => {
    try {
        const parsedData = teamSchema.parse(req.body);
        const newTeam = await Team.create(parsedData);
    } catch (error) {
        // Combine all errors in an array
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
        const teams = await Team.find();
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
