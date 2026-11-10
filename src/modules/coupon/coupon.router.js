

import { Router } from 'express'
import { protectedRouters } from '../auth/user.controller.js'
import { addCoupon, allCoupons, deleteCoupon, getCoupon, updateCoupon } from './coupon.controller.js'


const couponRouter=Router()

couponRouter.route('/')
.post(protectedRouters,addCoupon)
.get(allCoupons)

couponRouter.route('/:id')
.put(updateCoupon)
.delete(deleteCoupon)
.get(getCoupon)





export default couponRouter