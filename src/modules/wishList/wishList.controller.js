

import { catchError } from '../middleware/catchError.js'
import { AppError } from '../middleware/appError.js'
import { User } from '../../../Database/models/user.model.js'




const addToWishList=catchError(async(req,res,next)=>{
   let wishLise=await User.findByIdAndUpdate(req.user._id,
      {$addToSet:{wishList:req.body.product}},{new:true})
   wishLise || next(new AppError("wishLise not found",404))
   !wishLise || res.json({message:"success",wishLise})
})
const removeToWishList=catchError(async(req,res,next)=>{
   let wishLise=await User.findByIdAndDelete(req.user._id,
      {$pull:{wishList:req.parmas.id}},{new:true})
   wishLise || next(new AppError("wishLise not found",404))
   !wishLise || res.json({message:"success",wishLise})
})
const getLoggedUserToWishList  =catchError(async(req,res,next)=>{
   let wishLise=await User.findById(req.user._id)
      
   wishLise || next(new AppError("wishLise not found",404))
   !wishLise || res.json({message:"success",wishLise})
})


export{
   addToWishList,
   removeToWishList,
   getLoggedUserToWishList
}