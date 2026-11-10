import { Router } from 'express'
import { allowedTo, protectedRouters } from '../auth/user.controller.js'
import { addToCart, applyCoupon, clearUserCart, getLoggedUserCart, removeItmesFromCart, updateQuantity  } from './cart.controller.js'


const cartRouter = Router()

cartRouter.route('/')
   .post(protectedRouters, allowedTo('user'), addToCart)
   .get(protectedRouters, allowedTo('user'), getLoggedUserCart)
   .delete(protectedRouters, allowedTo('user'), clearUserCart)

cartRouter.route('/:id')
 .put(protectedRouters, allowedTo('user'),updateQuantity)
 .delete(protectedRouters, allowedTo('user'),removeItmesFromCart)
   
cartRouter.post('/apply_coupon',protectedRouters, allowedTo('user'),applyCoupon)

export default cartRouter