import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        }, // Project names must be unique
        description: {
            type: String,
        }, // Optional field for project details
    },
    {
        timestamps: true,
    }
);
const Project = mongoose.model("Project", projectSchema);
export default Project;
