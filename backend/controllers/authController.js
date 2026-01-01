import User from "../models/userModel.js"
import bycrypt from "bcryptjs"

const signUp = async (req, res) => {
    try {
        const {email, fullName, password, mobileNumber, role} = req.body
        const user = await user.findOne({email})
            if(User){
                return res.status(404).json({message:"user already exist"}) 
            }
            if(password.length<6){
                return res.status(404).json({message:"password must contain 6 charachter"})
            }
            if(mobileNumber.length<10){
                 return res.status(404).json({message:"mobile number must contain 10 charachter"})

            }
        const hashpassword = await bycrypt.hash(password, 10)
        user = await User.create({
            fullName,
            email,
            mobileNumber,
            role,
            password:hashpassword
        })
        

    } catch (error) {
        
    }
}