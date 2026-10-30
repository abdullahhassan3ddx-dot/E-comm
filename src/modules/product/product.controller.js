import slugify from 'slugify'
import { catchError } from '../middleware/catchError.js'
import { AppError } from '../middleware/appError.js'
import { Product } from '../../../Database/models/product.model.js'
import { deleteOne } from '../deleteOne/deleteOne.js'

// const addProduct = catchError(async (req, res, next) => {
//    req.body.slug = slugify(req.body.title) 
//    let product = new Product(req.body)
//    await product.save()
//    product || next(new AppError("product not found", 404))
//    !product || res.json({ message: "success", product })
// })
const addProduct = catchError(async (req, res, next) => {
   req.body.slug = slugify(req.body.title) 

   // معالجة الصور المرفوعة عبر Multer
   if (req.files) {
      if (req.files.imageCover) {
         req.body.imageCover = req.files.imageCover[0].filename
      }
      if (req.files.images) {
         req.body.images = req.files.images.map(file => file.filename)
      }
   }

   let product = new Product(req.body)
   await product.save()
   
   res.status(201).json({ message: "success", product })
})

const allProducts = catchError(async (req, res, next) => {
   let products = await Product.find()
   products || next(new AppError("product not found", 404))
   !products || res.json({ message: "success", products })
})

const getProduct = catchError(async (req, res, next) => {
   let product = await Product.findById(req.params.id)
   product || next(new AppError("product not found", 404))
   !product || res.json({ message: "success", product })
})

const updateProduct = catchError(async (req, res, next) => {
   // تحديث الـ slug تلقائياً إذا تم تعديل عنوان المنتج (Title)
   if (req.body.title) {
      req.body.slug = slugify(req.body.title)
   }

   let product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
   product || next(new AppError("product not found", 404))
   !product || res.json({ message: "success", product })
})

const deleteProduct = deleteOne(Product)

export {
    addProduct,
    allProducts,
    getProduct,
    updateProduct,
    deleteProduct
}