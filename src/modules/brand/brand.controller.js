
import slugify from 'slugify'
import { Brand } from '../../../Database/models/brand.model.js'
import { catchError } from '../middleware/catchError.js'
import { AppError } from '../middleware/appError.js'
import { deleteOne } from '../deleteOne/deleteOne.js'


const addBrand=catchError(async(req,res,next)=>{
   req.body.slug = slugify(req.body.name) 
   let brand=new Brand(req.body)
   await brand.save()
   brand || next(new AppError("brand not found",404))
   !brand || res.json({message:"success",brand})
})
const allBrands=catchError(async(req,res,next)=>{
   let brands=await Brand.find()
   brands || next(new AppError("brands not found",404))
   !brands || res.json({message:"success",brands})
})
const getBrand=catchError(async(req,res,next)=>{
   let brand=await Brand.findById(req.params.id)
   brand || next(new AppError("brand not found",404))
   !brand || res.json({message:"success",brand})
})
const updateBrand=catchError(async(req,res,next)=>{
   let brand=await Brand.findByIdAndUpdate(req.params.id,req.body,{new:true})
   brand || next(new AppError("brand not found",404))
   !brand || res.json({message:"success",brand})
})
const deleteBrand=deleteOne(Brand)

export{
    addBrand,
    allBrands,
    getBrand,
    updateBrand,
    deleteBrand
}