import { Cart } from '../../../Database/models/cart.model.js';
import { Order } from '../../../Database/models/order.model.js';
import { Product } from '../../../Database/models/product.model.js';
import { AppError } from '../middleware/appError.js';
import { catchError } from '../middleware/catchError.js';



const createCashOrder = catchError(async (req, res, next) => {
   let cart = await Cart.findById(req.params.id)
   if (!cart) return next(new AppError("cart not found"))
      console.log(cart);
      
   let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice
   let order = new Order({
      user:req.user._id,
      orderItems:cart.cartItems,
      shippingAddress:req.body.shippingAddress,
      totalOrderPrice
   })
   await order.save()

   let options =cart.cartItems.map((prod)=>{
      return (
     { updateOne : {
        "filter" : { _id: prod.product }, 
        "update" : { $inc : { sold:prod.quantity, stock : -prod.quantity } }
     } }
    )

   })
   await Product.bulkWrite(options)

   res.json({ message: "success", order })

})


const getUserOrder = catchError(async (req, res, next) => {
   let order = await Order.findOne({id:req._user._id}).populate('orderItems.product')
   res.json({message:'success',order})
   

})
const getAllOrders = catchError(async (req, res, next) => {
   let orders = await Order.find({})
   res.json({message:'success',orders})
   

})

export {createCashOrder,getUserOrder,getAllOrders };

