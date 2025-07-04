import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectedRoute= async(req,res,next)=>{
    try{
const token=req.cookies.jwt;
if(!token)
{
    return res.status(401).json({error:"Unauthorizex :no Token Provided"})
}
// const decoded=jwt.verify(token,process.env.JWT_SECRET);
const decoded = jwt.verify(token, process.env.JWT_SECRET);

if(!decoded)
{
    return res.status(401).json({error:"Unauthorizex :no Token Provided"})
 
}
const user=await User.findById(decoded.userId).select("-password");
if(!user)
{
    return res.status(404).json({error:"user not found"});


}
req.user=user;
next();

    }catch(error)
    {
        console.log("Error in /me controller ",error.message);
        res.status(500).json({error:"Internal server error1"});
    }
}