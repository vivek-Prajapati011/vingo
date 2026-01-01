import mongoose from "mongoose";
const connectDB = async () => {
    try {
       await mongoose.connect(process.env.MONGODB_URL)
       console.log("connected to mogodb server")
    } catch (error) {
        console.log("connection fail")
    }

}
export default connectDB