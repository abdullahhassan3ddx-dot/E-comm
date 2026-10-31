import { Router } from 'express'
import { allowedTo, protectedRouters } from '../auth/user.controller.js'
import { addToWishList, getLoggedUserToWishList, removeFromWishList } from '../wishList/wishList.controller.js'

const wishListRouter = Router()

wishListRouter.route('/')
   .post(protectedRouters, allowedTo('user'), addToWishList)
   .get(protectedRouters, allowedTo('user'), getLoggedUserToWishList) // تمت إضافة الحماية هنا

wishListRouter.route('/:id')
   .delete(protectedRouters, allowedTo('user'), removeFromWishList) // تمت إضافة الحماية هنا

export default wishListRouter