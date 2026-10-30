import { Category } from "../../../Database/models/categroy.model.js"

import slugify from 'slugify'
import { AppError } from "../middleware/appError.js"
import { catchError } from "../middleware/catchError.js"
import fs from "fs"
import { deleteOne } from "../deleteOne/deleteOne.js"

const addCategory=catchError(async(req,res,next)=>{
   req.body.slug = slugify(req.body.name) 
   req.body.image=req.file.filename
   let category=new Category(req.body)
   await category.save()
   category || next(new AppError("category not found",404))
   !category || res.json({message:"success",category})})

const allCategories=catchError(async(req,res,next)=>{
    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || 5
  if (page < 1) page = 1
  const skip = (page - 1) * limit
      if (req.params.page<1) req.params.page=1 

   let filterObj =structuredClone(req.query)
   filterObj=JSON.stringify(filterObj)
   filterObj =filterObj.replace(/(gt|gte|lt|lte)/g ,value => `$${value}` )
   filterObj=JSON.parse(filterObj)
   let exlcudedFields=['page','sort','fields','search']
   exlcudedFields.forEach((val)=>{
      delete filterObj['page']
   })

   let categories=await Category.find().skip(skip).limit(limit)
   categories || next(new AppError("categroies not found",404))
   !categories || res.json({message:"success",page,categories})
})
const getCategory=catchError(async(req,res,next)=>{
   let category=await Category.findById(req.params.id)
   category || next(new AppError("category not found",404))
   !category || res.json({message:"success",category})
})
const updateCategory=catchError(async(req,res,next)=>{
   req.body.image=req.file.filename
   let category=await Category.findByIdAndUpdate(req.params.id,req.body, { returnDocument: 'after' })
   category || next(new AppError("category not found",404))
   !category || res.json({message:"success",category})
})
const deleteCategory = deleteOne(Category)
export{
    addCategory,
    allCategories,
    getCategory,
    updateCategory,
    deleteCategory
}