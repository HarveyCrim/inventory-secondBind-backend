import express from "express"
import { createOrGetUser } from "../controllers/usercontroller"
const userRouter = express.Router()

userRouter.post("/create", createOrGetUser)

export default userRouter

