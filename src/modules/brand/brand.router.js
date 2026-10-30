

import { Router } from 'express'
import { addBrand, allBrands, deleteBrand, getBrand, updateBrand } from './brand.controller.js'
import { protectedRouters } from '../auth/user.controller.js'


const brandRouter=Router()

brandRouter.route('/')
.post(protectedRouters,addBrand)
.get(allBrands)

brandRouter.route('/:id')
.put(updateBrand)
.delete(deleteBrand)
.get(getBrand)





export default brandRouter