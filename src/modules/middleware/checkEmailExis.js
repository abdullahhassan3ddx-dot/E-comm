import { User } from "../../../Database/models/user.model.js"
import { AppError } from "./appError.js"


export const checkEmail= async (req,res,next)=>{
    const isFound=await User.findOne({email:req.body.email})
    if (isFound) return next(new AppError("email already exists.",409))
    next()
}


