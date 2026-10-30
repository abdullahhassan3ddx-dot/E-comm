

import { Router } from 'express'
import { allowedTo, protectedRouters } from '../auth/user.controller.js'
import { addReview, allReviews, deleteReview, getReview, updateReview } from './review.controller.js'


const reviewRouter=Router()

reviewRouter.route('/')
.post(protectedRouters,allowedTo('user'),addReview)
.get(allReviews)

reviewRouter.route('/:id')
.put(protectedRouters,allowedTo('user'),updateReview)
.delete(protectedRouters,allowedTo('user'),deleteReview)
.get(getReview)





export default reviewRouter