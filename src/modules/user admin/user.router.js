

import { Router } from 'express'
import { addUser, allUsers, deleteUser, getUser, updateUser } from './user.controller.js'
import { checkEmail } from '../middleware/checkEmailExis.js'
import orderRouter from '../order/order.router.js'


const userRouter=Router()
userRouter.use('/:user/orders',orderRouter)


userRouter.route('/')
.post(checkEmail,addUser)
.get(allUsers)

userRouter.route('/:id')
.put(updateUser)
.delete(deleteUser)
.get(getUser)





export default userRouter