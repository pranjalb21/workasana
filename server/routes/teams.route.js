import express from "express";
import { createTeam, getTeams } from "../apis/team.api.js";
import verifyJwt from "../middlewares/verifyJwt.js";

const router = express.Router();

router
    .post("/add", verifyJwt, createTeam)
    .get("/", verifyJwt, getTeams);

export default router;
