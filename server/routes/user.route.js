import express from "express";
import {
    getAllUsers,
    getUserByToken,
    userLogin,
    userSignUp,
} from "../apis/user.api.js";
import verifyJwt from "../middlewares/verifyJwt.js";

const router = express.Router();

router
    .post("/login", userLogin)
    .post("/signup", userSignUp)
    .post("/me", verifyJwt, getUserByToken)
    .get("/", verifyJwt, getAllUsers);

export default router;
