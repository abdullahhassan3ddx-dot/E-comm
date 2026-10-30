
import { Router } from 'express'
import { addSubCategory, allSubCategories, deleteSubCategory, getSubCategory, updateSubCategory } from './subcategory.controller.js'


const subCategroyRouter=Router({mergeParams:true})

subCategroyRouter.route('/')
.post(addSubCategory)
.get(allSubCategories)

subCategroyRouter.route('/:id')
.put(updateSubCategory)
.delete(deleteSubCategory)
.get(getSubCategory)





export default subCategroyRouter