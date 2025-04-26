import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        }, // Team names must unique
        description: {
            type: String,
        }, // Optional description for the team
    },
    {
        timestamps: true,
    }
);
const Team = mongoose.model("Team", teamSchema);
export default Team;
