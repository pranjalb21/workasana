import mongoose from "mongoose";

// Task Schema
const taskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        }, // Refers to Project model
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: true,
        }, // Refers to Team model
        owners: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            }, // Refers to User model (owners)
        ],
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag",
                required: true,
            }, // Refers to Tag model (tags)
        ], // Array of tags
        timeToComplete: {
            type: String,
            required: true,
        }, // Estimate date to complete the task
        status: {
            type: String,
            enum: ["To Do", "In Progress", "Completed", "Blocked"],
            // Enum for task status
            default: "To Do",
        }, // Task status
        priority: {
            type: String,
            enum: ["Low", "High", "Medium"],
            // Enum for task status
            default: "Medium",
        }, // Task status
    },
    {
        timestamps: true,
    }
);
const Task = mongoose.model("Task", taskSchema);
export default Task;
