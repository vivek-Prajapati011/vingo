import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser"
import authRoute from "./routers/authRoute.js"
dotenv.config()
const app = express()
const port = process.env.PORT || 5000
app.use(cors({
    Credential:true,
    origin:"htpp://localhost5173"
})) 
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoute)
app.listen(port, () =>{
     connectDB()
    console.log(`server is running on ${port}`)
})
