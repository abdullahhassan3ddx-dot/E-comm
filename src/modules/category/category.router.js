import { uploadSingleFile } from "../fileUpload/fileUpload.js";
import { addCategory, allCategories, deleteCategory, getCategory, updateCategory } from "./category.controller.js";
import { validate } from '../middleware/validtion.js'
import { Router } from 'express'
import { addCategoryVaildtion } from "./category.valid.js";
import subCategroyRouter from "../subcategory/subcategory.router.js";
import { allowedTo, protectedRouters } from "../auth/user.controller.js";


const categroyRouter=Router()
categroyRouter.use('/:category/subcategories',subCategroyRouter)
categroyRouter.route('/')
.post(protectedRouters,allowedTo('user'),uploadSingleFile('image','categories'),validate(addCategoryVaildtion),addCategory)
.get(allCategories)

categroyRouter.route('/:id')
.put(uploadSingleFile('image','categories'), updateCategory)
.delete(allowedTo('admin','user'),deleteCategory)
.get(allowedTo('admin'),getCategory)





export default categroyRouter