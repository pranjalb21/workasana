import Task from "../models/task.model.js";
import generateError from "../utils/generateError.js";
import taskSchema from "../utils/validators/task.validator.js";

export const createTask = async (req, res) => {
    try {
        console.log(req.body);

        const parsedData = taskSchema.parse(req.body);
        console.log(parsedData);

        const newTask = await Task.create(parsedData);
        await newTask.populate(["owners", "project", "team", "tags"]);
        return res
            .status(201)
            .json({ message: "Task created successfully", data: newTask });
    } catch (error) {
        // Combine all errors in an array
        console.log(error.message);

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
        const task = await Task.findById(taskId).populate([
            "owners",
            "project",
            "team",
            "tags",
        ]);
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
export const getOwnTasks = async (req, res) => {
    try {
        const { task_status, keyword } = req.query;
        const filter = { owners: req.user._id };
        if (task_status) filter.status = task_status;
        if (keyword) filter.name = { $regex: keyword, $options: "i" };
        const task = await Task.find(filter).populate([
            "owners",
            "project",
            "team",
            "tags",
        ]);
        if (!task) {
            return res.status(404).json({ error: "No tasks found." });
        }
        return res
            .status(200)
            .json({ message: "Tasks fetched successfully.", data: task });
    } catch (error) {
        // Return error response
        return res.status(500).json({
            error: "Error occured while fetching task.",
            message: error.message,
        });
    }
};
export const getAllTasks = async (req, res) => {
    try {
        const task = await Task.find().populate([
            "owners",
            "project",
            "team",
            "tags",
        ]);
        if (!task) {
            return res.status(404).json({ error: "No tasks found." });
        }
        return res
            .status(200)
            .json({ message: "Tasks fetched successfully.", data: task });
    } catch (error) {
        // Return error response
        return res.status(500).json({
            error: "Error occured while fetching task.",
            message: error.message,
        });
    }
};
export const getTasksByProject = async (req, res) => {
    try {
        const { projectId, priority, created, status } = req.query;
        // Define filter conditions
        const filter = {};
        if (projectId) filter.project = projectId;
        if (status) filter.status = status;

        // Define sort conditions
        const sort = {};
        if (created === "newest") {
            sort.createdAt = -1; // Sort by newest first
        } else if (created === "oldest") {
            sort.createdAt = 1; // Sort by oldest first
        }

        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        if (priority) {
            sort.priority = priority === "ascending" ? -1 : 1;
        }

        // console.log(sort);

        let tasks = await Task.find(filter)
            .populate(["owners", "project", "team", "tags"])
            .sort(sort);
        if (!tasks) {
            return res.status(404).json({ error: "No tasks found." });
        }
        // Apply custom sorting in JavaScript if MongoDB sorting doesn't work
        tasks = tasks.sort((a, b) => {
            return priority === "descending"
                ? b.priority - a.priority
                : a.priority - b.priority;
        });

        return res
            .status(200)
            .json({ message: "Tasks fetched successfully.", data: tasks });
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
        const updatedTask = await Task.findByIdAndUpdate(taskId, parsedData, {
            new: true,
        }).populate(["owners", "project", "team", "tags"]);
        return res
            .status(200)
            .json({ message: "Task updated successfully.", data: updatedTask });
    } catch (error) {
        // Combine all errors in an array
        console.log(error.message);

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
