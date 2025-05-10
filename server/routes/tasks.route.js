import express from "express";
import {
    createTask,
    deleteTask,
    getOwnTasks,
    getTaskById,
    getTasksByProject,
    updateTask,
} from "../apis/task.api.js";
import verifyJwt from "../middlewares/verifyJwt.js";

const router = express.Router();

router
    .post("/", verifyJwt, createTask)
    .put("/:taskId", verifyJwt, updateTask)
    .get("/self", verifyJwt, getOwnTasks)
    .get("/project", verifyJwt, getTasksByProject)
    .get("/:taskId", verifyJwt, getTaskById)
    .delete("/:taskId", verifyJwt, deleteTask);

export default router;
