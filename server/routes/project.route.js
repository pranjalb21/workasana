import express from "express";
import verifyJwt from "../middlewares/verifyJwt.js";
import {
    createProject,
    getOwnProjects,
    getProjectById,
    getProjects,
} from "../apis/project.api.js";

const router = express.Router();

router
    .post("/", verifyJwt, createProject)
    .get("/", verifyJwt, getProjects)
    .get("/project-id/:projectId", verifyJwt, getProjectById)
    .get("/self", verifyJwt, getOwnProjects);
export default router;
