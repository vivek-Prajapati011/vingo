import { configDotenv } from "dotenv";
import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "Gmil",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS ,
  },
})

export const sendOtpMail = async(to, otp) => {
    await transporter.sendMail({
        from:process.env.EMAIL,
        to,
        subject:"Rest your password",
        html:`<p>Your OTP for password reset is ${otp}. Expire in 5 minute`

    })
}