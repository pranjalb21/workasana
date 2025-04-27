import express from "express";
import { getUserByToken, userLogin, userSignUp } from "../apis/user.apis.js";
import verifyJwt from "../middlewares/verifyJwt.js";

const router = express.Router();

router
    .post("/login", userLogin)
    .post("/signup", userSignUp)
    .post("/me", verifyJwt, getUserByToken);

export default router;
