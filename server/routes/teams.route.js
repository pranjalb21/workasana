import express from "express";
import { createTeam, getTeamByName, getTeams } from "../apis/team.api.js";
import verifyJwt from "../middlewares/verifyJwt.js";

const router = express.Router();

router
    .post("/", verifyJwt, createTeam)
    .get("/", verifyJwt, getTeams)
    .get("/team-name", verifyJwt, getTeamByName);

export default router;
