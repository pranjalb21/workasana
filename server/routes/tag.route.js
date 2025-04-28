import express from "express";
import { createTag, getTags } from "../apis/tag.api.js";
import verifyJwt from "../middlewares/verifyJwt.js";

const router = express.Router();

router
    .post("/add",verifyJwt, createTag)
    .get("/",verifyJwt, getTags);

export default router;
