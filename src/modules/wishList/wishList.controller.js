import { catchError } from '../middleware/catchError.js'
import { AppError } from '../middleware/appError.js'
import { User } from '../../../Database/models/user.model.js'

// 1. إضافة منتج إلى المفضلة
const addToWishList = catchError(async (req, res, next) => {
   let wishList = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { wishList: req.body.product } },
      { new: true }
   ).populate('wishList'); // اختيارياً: لجلب تفاصيل المنتجات إذا كانت مرجعية (Reference)

   if (!wishList) {
      return next(new AppError("User not found", 404));
   }
   
   res.json({ message: "success", wishList: wishList.wishList });
});

// 2. إزالة منتج من المفضلة
const removeFromWishList = catchError(async (req, res, next) => {
   let wishList = await User.findByIdAndDelete(
      req.user._id,
      { $pull: { wishList: req.params.id } },
      { new: true }
   ).populate('wishList');

   if (!wishList) {
      return next(new AppError("User not found", 404));
   }
   
   res.json({ message: "success", wishList: wishList.wishList });
});

// 3. جلب قائمة المفضلة للمستخدم الحالي
const getLoggedUserToWishList = catchError(async (req, res, next) => {
   let user = await User.findById(req.user._id).populate('wishList');
      
   if (!user) {
      return next(new AppError("User not found", 404));
   }
   
   res.json({ message: "success", wishList: user.wishList });
});

export {
   addToWishList,
   removeFromWishList,
   getLoggedUserToWishList
}