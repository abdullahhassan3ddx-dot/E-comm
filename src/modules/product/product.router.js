

import { Router } from 'express'
import { addProduct, allProducts, deleteProduct, getProduct, updateProduct } from './product.controller.js'
import { uploadMaxOfFiles } from '../fileUpload/fileUpload.js'


const productRouter=Router()

productRouter.route('/')
.post(uploadMaxOfFiles([{name:'imageCover',maxCount:1},{name:'images',maxCount:10}],'products'),addProduct)
.get(allProducts)

productRouter.route('/:id')
.put(uploadMaxOfFiles([{name:'imageCover',maxCount:1},{name:'images',maxCount:10}],'products'),updateProduct)
.delete(deleteProduct)
.get(getProduct)





export default productRouter