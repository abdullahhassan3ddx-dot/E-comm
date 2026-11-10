import { Cart } from '../../../Database/models/cart.model.js';
import { Coupon } from '../../../Database/models/coupon.model.js';
import { Product } from '../../../Database/models/product.model.js';
import { AppError } from '../middleware/appError.js';
import { catchError } from '../middleware/catchError.js';

function clcTotalPrice(isExist) {
      isExist.totalCartPrice =
       isExist.cartItems.reduce((prev,item)=> prev += item.quantity*item.price ,0 )
       if (isExist.discount) {
            isExist.totalCartPriceAfterDiscount=
            isExist.totalCartPrice -(isExist.totalCartPrice * isExist.discount) / 100 }
       }
      
const addToCart = catchError(async (req, res, next) => {
   
      
   
   let isCartExist= await Cart.findOne({user:req.user._id})
   let product =await Product.findById(req.body.product)
   if (!product) return next(new AppError("product not found"))
    req.body.price=product.price
   if (req.body.quantity>product.stock)  return next(new AppError("sold Out"))
   if (!isCartExist) {
      let cart=new Cart({
         user:req.user._id,
         cartItems:[req.body]
      })
      clcTotalPrice(cart)
      await cart.save()
      res.json({message:"success",cart})
   }else {
      let item=isCartExist.cartItems.find(item=>item.product==req.body.product)
      if (item) {
         item.quantity += Number(req.body.quantity || 1)
         if (item.quantity>product.stock) return next(new AppError("sold Out"))
      }
      if(!item) isCartExist.cartItems.push(req.body)  
      clcTotalPrice(isCartExist)
      await isCartExist.save()
      res.json({message:"success",cart:isCartExist})
   }
})
const updateQuantity = catchError(async (req, res, next) => {
   let cart =await Cart.findOne({user:req.user._id})
   let item=cart.cartItems.find(item => item.product == req.params.id)
   if (!item) return next(new AppError('product not found',404))
   item.quantity = Number(req.body.quantity)
   clcTotalPrice(cart)
   
   await cart.save()
   
   res.json({message:"success",cart})
   
})
const removeItmesFromCart = catchError(async (req, res, next) => {
   let cart = await Cart.findOneAndUpdate(
      {user:req.user._id},
      { $pull: { cartItems: { _id: req.params.id } } }, // استخدام addresses بالجمع
      { new: true }
   );
   clcTotalPrice(cart)
   await cart.save()

   if (!cart) {
      return next(new AppError("cart not found", 404));
   }
   
   res.json({ message: "success", cart });
});
const getLoggedUserCart = catchError(async (req, res, next) => {
   let cart = await Cart.findOne({user:req.user._id});
   
   !cart || res.json({ message: "success", cart });
    
   
   
});
const applyCoupon = catchError(async (req, res, next) => {
   let coupon = await Coupon.findOne({code:req.body.code,expires:{$gte: Date.now()}});
   if (!coupon) return next(new AppError('opps coupon invaild'))
   let cart = await Cart.findOne({user:req.user._id})
   cart.discount = coupon.discount
   await cart.save()
    res.json({ message: "success", cart });
    
   
   
});
const clearUserCart = catchError(async (req, res, next) => {
   let cart = await Cart.findOneAndDelete({user:req.user._id});
   

    res.json({ message: "success", cart });
    
   
   
});





export {
   addToCart,
   updateQuantity,
   removeItmesFromCart,
   getLoggedUserCart,
   clearUserCart,
   applyCoupon
}
