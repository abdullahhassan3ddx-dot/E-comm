
import slugify from 'slugify'
import { SubCategory } from "../../../Database/models/subcategroy.model.js"
import { catchError } from '../middleware/catchError.js'
import { AppError } from '../middleware/appError.js'
import { deleteOne } from '../deleteOne/deleteOne.js'


const addSubCategory=catchError(async(req,res,next)=>{
   req.body.slug = slugify(req.body.name) 
   let subcategory=new SubCategory(req.body)
   await subcategory.save()
   subcategory || next(new AppError("subcategory not found",404))
   !subcategory || res.json({message:"success",subcategory})
})
const allSubCategories = catchError(async (req, res, next) => {
  let filterObj = {}

  if (req.params.category) {
    filterObj.category = req.params.category
  }

  const subcategories = await SubCategory.find(filterObj)

  res.json({ message: "success", results: subcategories.length, subcategories })
})
const getSubCategory=catchError(async(req,res,next)=>{
   let subcategory=await SubCategory.findById(req.params.id)
   subcategory || next(new AppError("subcategory not found",404))
   !subcategory || res.json({message:"success",subcategory})
})
const updateSubCategory=catchError(async(req,res,next)=>{
   let subcategory=await SubCategory.findByIdAndUpdate(req.params.id,req.body,{new:true})
   subcategory || next(new AppError("subcategory not found",404))
   !subcategory || res.json({message:"success",subcategory})})
const deleteSubCategory=deleteOne(SubCategory)
export{
    addSubCategory,
    allSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
}