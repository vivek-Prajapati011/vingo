import User from "../models/userModel.js"
import bcrypt from "bcrypt.js"
import genToken from "../utils/token.js"

export const signUp = async (req, res) => {
  try {
    const { email, fullName, password, mobileNumber, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    if (mobileNumber.length !== 10) {
      return res.status(400).json({ message: "Mobile number must be 10 digits" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      mobileNumber,
      role,
      password: hashedPassword,
    });

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json(user);

  } catch (error) {
    return res.status(500).json({ message: "Signup error", error });
  }
};


export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ message: "Signin error", error });
  }
};


export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    return res.status(500).json({ message: "Signout error", error });
  }
};


export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp; 
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;

    await user.save();
    await sendOtpMail(email, otp);

    return res.status(200).json({ message: "OTP sent successfully" });

  } catch (error) {
    return res.status(500).json({ message: "OTP error", error });
  }
};

export const verifyOtp = async (req, res) =>{
    try {
        const {email,otp} = req.body
        const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // OTP expired?
    if (!user.otpExpires || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }
     user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save()
    } catch (error) {
        return res.status(500).json({ message: "OTP verification failed", error });
        
    }
}

export const resetPassword = async (req, res) => {
    try {
        const {email, newPassword} = req.body
        const user = await User.findOne({email})
        if(!user || !user.isOtpVerified){
            return  res.status(400).json({ message: "OTP verification required"});
        } 
        const hashedPassword = await bcrypt.hash(newPassword,10)
        user.password = hashedPassword
        user.isOtpVerified = false
        await user.save()
        return res.status(400).json({ message: "password reset succesfully" });
    } catch (error) {
        return res.status(500).json({ message: "reset password error", error });
    }
}