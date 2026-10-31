import addressRouter from "../address/address.router.js"
import authRouter from "../auth/user.router.js"
import brandRouter from "../brand/brand.router.js"
import productRouter from "../product/product.router.js"
import reviewRouter from "../review/review.router.js"
import subCategroyRouter from "../subcategory/subcategory.router.js"
import userRouter from "../user admin/user.router.js"
import wishListRouter from "../wishList/wishList.router.js"
import categroyRouter from "./category.router.js"

export const bootstrap = (app) => {
    app.use('/api/categories', categroyRouter)
    app.use('/api/subcategories', subCategroyRouter)
    app.use('/api/brands', brandRouter)
    app.use('/api/products', productRouter)
    app.use('/api/users', userRouter)
    app.use('/api/auth', authRouter)
    app.use('/api/reviews', reviewRouter)
    app.use('/api/wishLists', wishListRouter)
    app.use('/api/addresses', addressRouter)
}