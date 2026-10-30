import { Review } from "../../../Database/models/review.model.js"
import { deleteOne } from "../deleteOne/deleteOne.js"
import { AppError } from "../middleware/appError.js"
import { catchError } from "../middleware/catchError.js"


const addReview=catchError(async(req,res,next)=>{
   req.body.user=req.user._id
   let isExist=await Review.findOne({user:req.user._id,product:req.body.product})
   if (isExist) return next(new AppError('you not created review befor'))
   let review=new Review(req.body)
   await review.save()
   review || next(new AppError("review not found",404))
   !review || res.json({message:"success",review})
})
const allReviews=catchError(async(req,res,next)=>{
   let reviews=await Review.find()
   reviews || next(new AppError("reviews not found",404))
   !reviews || res.json({message:"success",reviews})
})
const getReview=catchError(async(req,res,next)=>{
   let review=await Review.findById(req.params.id)
   review || next(new AppError("review not found",404))
   !review || res.json({message:"success",review})
})
const updateReview=catchError(async(req,res,next)=>{
   let review=await Review.findOneAndUpdate({_id:req.params.id ,user:req.user._id},req.body,{new:true})
   review || next(new AppError("review not found or you not created the review",404))
   !review || res.json({message:"success",review})
})
const deleteReview = deleteOne(Review)

export{
    addReview,
    allReviews,
    getReview,
    updateReview,
    deleteReview
}