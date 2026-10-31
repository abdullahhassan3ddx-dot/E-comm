import { Router } from 'express'
import { allowedTo, protectedRouters } from '../auth/user.controller.js'
import { addAddress, getLoggedUserToAddress, removeFromAddress } from './address.controller.js'


const addressRouter = Router()

addressRouter.route('/')
   .post(protectedRouters, allowedTo('user'), addAddress)
   .get(protectedRouters, allowedTo('user'), getLoggedUserToAddress) // تمت إضافة الحماية هنا

addressRouter.route('/:id')
   .delete(protectedRouters, allowedTo('user'), removeFromAddress) // تمت إضافة الحماية هنا

export default addressRouter