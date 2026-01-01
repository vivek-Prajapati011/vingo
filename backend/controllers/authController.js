import User from "../models/userModel.js"
import bycrypt from "bcryptjs"
import genToken from "../utils/token.js"

export const signUp = async (req, res) => {
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
        const token = await genToken(user._id)
        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly:true
        })
        return res.status(201).json(user)
        

    } catch (error) {
         return res.status(500).json(`sigup error${error}`)
    }
}

export const signIn = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await user.findOne({email})
            if(!User){
                return res.status(404).json({message:"user doesn`t exist"}) 
            }
        const isMatch = await bycrypt.compare(password, user.password)
        if(!isMatch){
             res.status(400).json({message:"password incorrect"})
        }
       
        const hashpassword = await bycrypt.hash(password, 10)
        user = await User.create({
            fullName,
            email,
            mobileNumber,
            role,
            password:hashpassword
        })
        const token = await genToken(user._id)
        res.cookie("token",token,{
            secure:false,
            sameSite:"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly:true
        })
        return res.status(201).json(user)
        

    } catch (error) {
         return res.status(500).json(`sigup error${error}`)
    }
}

export const signOUT = async (req,res) => {
    try {
        res.clearcookie("token")
    return res.status(200).json({message:"successfully logout"})
    } catch (error) {
        return res.status(500).json(`sigout error${error}`)
    }
}