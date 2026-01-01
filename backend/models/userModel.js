import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:ture,
        unique:true
    },
    password:{
        type:String,
    },
    mobileNumber:{
        type:String,
        required: true
    },
    role:{
        type:String,
        enum:["user","deliveryBoy","owner"],
        required: true

    }

},{ timestamps:true })

const User = mongoose.model("user", userSchema)
export default User