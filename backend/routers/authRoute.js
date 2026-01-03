import express, { Router } from "express"
import { resetPassword, sendOtp, signIn, signOUT, signUp, verifyOtp } from "../controllers/authController"
const authRoute = express.Router()

authRoute.post("/signUp", signUp)
authRoute.post("/signIn", signIn)
authRoute.get("/signout", signOUT)
authRoute.post("/send-otp", sendOtp)
authRoute.post("/verify-otp", verifyOtp)
authRoute.post("/reset-password", resetPassword)


export default authRoute