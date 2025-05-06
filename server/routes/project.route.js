import express from "express";
import verifyJwt from "../middlewares/verifyJwt.js";
import { createProject, getProjects } from "../apis/project.api.js";

const router = express.Router();

router
    .post("/", verifyJwt, createProject)
    .get("/", verifyJwt, getProjects);
export default router;
