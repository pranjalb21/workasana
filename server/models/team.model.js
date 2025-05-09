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
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            }, // Refers to User model (owners)
        ],
    },
    {
        timestamps: true,
    }
);
const Team = mongoose.model("Team", teamSchema);
export default Team;
