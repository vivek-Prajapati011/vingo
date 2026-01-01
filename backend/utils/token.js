import jwt from "jsonwebtoken"

const genToken = async (userID) => {
    try {
        const token = await jwt.sign({userID}, process.env.JWT_SECRET,{expiresIn:"7d"})
    } catch (error) {
        console.log(error)
    }
}
export default genToken