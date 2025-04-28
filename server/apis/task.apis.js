import Task from "../models/task.models.js";
import generateError from "../utils/generateError.js";
import taskSchema from "../utils/validators/task.validator.js";

export const createTask = async (req, res) => {
    try {
        const parsedData = taskSchema.parse(req.body);
        const newTask = await Task.create(parsedData);
        return res
            .status(201)
            .json({ message: "Task created successfully", data: newTask });
    } catch (error) {
        // Combine all errors in an array
        const errors = generateError(error);

        // Return error response
        return res.status(500).json({
            error: "Error occured while creating task.",
            message: errors,
        });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: "Task not found." });
        }
        return res
            .status(200)
            .json({ message: "Task fetched successfully.", data: task });
    } catch (error) {
        // Return error response
        return res.status(500).json({
            error: "Error occured while fetching task.",
            message: error.message,
        });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const parsedData = taskSchema.parse(req.body);
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: "Task not found." });
        }
        const updatedTask = await Task.findByIdAndUpdate(taskId, parsedData);
        return res
            .status(200)
            .json({ message: "Task updated successfully.", data: updatedTask });
    } catch (error) {
        // Combine all errors in an array
        const errors = generateError(error);

        // Return error response
        return res.status(500).json({
            error: "Error occured while updating task.",
            message: errors,
        });
    }
};
export const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found." });
        }
        return res
            .status(200)
            .json({ message: "Task deleted successfully.", data: deletedTask });
    } catch (error) {
        // Return error response
        return res.status(500).json({
            error: "Error occured while deleting task.",
        });
    }
};
