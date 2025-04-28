import express from "express";
import {
    createTask,
    deleteTask,
    getTaskById,
    updateTask,
} from "../apis/task.api.js";
import verifyJwt from "../middlewares/verifyJwt.js";

const router = express.Router();

router
    .post("/add", verifyJwt, createTask)
    .put("/update/:taskId", verifyJwt, updateTask)
    .get("/:taskId", verifyJwt, getTaskById)
    .delete("/:taskId", verifyJwt, deleteTask);

export default router;
