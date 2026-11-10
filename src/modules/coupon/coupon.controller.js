

import { catchError } from '../middleware/catchError.js'
import { AppError } from '../middleware/appError.js'
import { deleteOne } from '../deleteOne/deleteOne.js'
import { Coupon } from '../../../Database/models/coupon.model.js'


const addCoupon=catchError(async(req,res,next)=>{
   let coupon=new Coupon(req.body)
   await coupon.save()
   coupon || next(new AppError("coupon not found",404))
   !coupon || res.json({message:"success",coupon})
})
const allCoupons=catchError(async(req,res,next)=>{
   let coupons=await Coupon.find()
   coupons || next(new AppError("coupons not found",404))
   !coupons || res.json({message:"success",coupons})
})
const getCoupon=catchError(async(req,res,next)=>{
   let coupon=await Coupon.findById(req.params.id)
   coupon || next(new AppError("coupon not found",404))
   !coupon || res.json({message:"success",coupon})
})
const updateCoupon=catchError(async(req,res,next)=>{
   let coupon=await Coupon.findByIdAndUpdate(req.params.id,req.body,{new:true})
   coupon || next(new AppError("coupon not found",404))
   !coupon || res.json({message:"success",coupon})
})
const deleteCoupon=deleteOne(Coupon)

export{
    addCoupon,
    allCoupons,
    getCoupon,
    updateCoupon,
    deleteCoupon
}