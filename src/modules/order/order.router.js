import { Router } from 'express'
import { allowedTo, protectedRouters } from '../auth/user.controller.js'
import { createCashOrder, getAllOrders, getUserOrder  } from './order.controller.js'





const orderRouter = Router({mergeParams:true})

orderRouter.route('/')
   .get(protectedRouters , allowedTo('user'), getAllOrders)
   

orderRouter.get('/users',protectedRouters , allowedTo('user'), getUserOrder)


orderRouter.route('/:id')
 .post(protectedRouters, allowedTo('user'),createCashOrder)
 
export default orderRouter