import express from "express"
import { userLogin } from "../apis/user.apis.js"

const router = express.Router()

router.post("/login", userLogin)

export default router