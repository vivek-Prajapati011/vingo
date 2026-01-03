import express, { Router } from "express"
import { signIn, signOUT, signUp } from "../controllers/authController"
const authRoute = express.Router()

authRoute.post("/signUp", signUp)
authRoute.post("/signIn", signIn)
authRoute.get("/signout", signOUT)

export default authRoute