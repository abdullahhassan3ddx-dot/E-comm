

import { Router } from 'express'
import { addBrand, allBrands, deleteBrand, getBrand, getLoggedUserToWishList, removeToWishList, updateBrand } from './wishList.controller.js'
import { protectedRouters } from '../auth/user.controller.js'


const wishListRouter=Router()

wishListRouter.route('/')
.post(protectedRouters,addToWishList)
.get(getLoggedUserToWishList)

wishListRouter.route('/:id')

.delete(removeToWishList)






export default wishListRouter