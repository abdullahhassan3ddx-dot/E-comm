

import { Router } from 'express'
import { addUser, allUsers, deleteUser, getUser, updateUser } from './user.controller.js'
import { checkEmail } from '../middleware/checkEmailExis.js'


const userRouter=Router()

userRouter.route('/')
.post(checkEmail,addUser)
.get(allUsers)

userRouter.route('/:id')
.put(updateUser)
.delete(deleteUser)
.get(getUser)





export default userRouter