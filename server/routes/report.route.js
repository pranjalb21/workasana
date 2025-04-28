import express from "express";
import { getLastWeekReport, getPendingTasks } from "../apis/report.api.js";

const router = express.Router();

router
    .get("/last-week", getLastWeekReport)
    .get("/pending-tasks", getPendingTasks);

export default router;
