import express from "express";
import verifyJwt from "../middlewares/verifyJwt.js";
import {
    createProject,
    getOwnProjects,
    getProjectById,
    getProjects,
    updateProjectStatus,
} from "../apis/project.api.js";

const router = express.Router();

router
    .post("/", verifyJwt, createProject)
    .patch("/status/:projectId", verifyJwt, updateProjectStatus)
    .get("/", verifyJwt, getProjects)
    .get("/project-id/:projectId", verifyJwt, getProjectById)
    .get("/self", verifyJwt, getOwnProjects);
export default router;
