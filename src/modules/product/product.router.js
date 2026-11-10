

import { Router } from 'express'
import { addProduct, allProducts, deleteProduct, getProduct, updateProduct } from './product.controller.js'
import { uploadMaxOfFiles } from '../fileUpload/fileUpload.js'
import { allowedTo, protectedRouters } from '../auth/user.controller.js'


const productRouter=Router()

productRouter.route('/')
.post(protectedRouters,allowedTo('user'),uploadMaxOfFiles([{name:'imageCover',maxCount:1},{name:'images',maxCount:10}],'products'),addProduct)
.get(allProducts)

productRouter.route('/:id')
.put(uploadMaxOfFiles([{name:'imageCover',maxCount:1},{name:'images',maxCount:10}],'products'),updateProduct)
.delete(deleteProduct)
.get(getProduct)





export default productRouter