import express from "express"
import { userLogin, userSignUp } from "../apis/user.apis.js"

const router = express.Router()

router
    .post("/login", userLogin)
    .post("/signup", userSignUp)

export default router