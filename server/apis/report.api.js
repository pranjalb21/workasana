import Task from "../models/task.model.js";

export const getLastWeekReport = async (req, res) => {
    try {
        const sevenDaysBackData = new Date(Date.now() - 7 * 24 * 3600 * 1000);
        const tasks = await Task.find({
            updatedAt: { $gte: sevenDaysBackData },
            status:"completed"
        });
        return res
            .status(200)
            .json({ message: "Task fetched successfully.", data: tasks });
    } catch (error) {
        // Return error response
        return res.status(500).json({
            error: "Error occured while fetching last week report.",
            message: error.message,
        });
    }
};

export const getPendingTasks = async(req,res)=>{
    try {
        const pendingTasks = await Task.find({status:{$ne:"completed"}})
        return res.status(200).json({message: "Pending tasks fetched successfully."})
    } catch (error) {
        // Return error response
        return res.status(500).json({
            error: "Error occured while fetching pending task report.",
            message: error.message,
        });
    }
}
