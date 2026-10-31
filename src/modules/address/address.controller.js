import { catchError } from '../middleware/catchError.js'
import { AppError } from '../middleware/appError.js'
import { User } from '../../../Database/models/user.model.js'

// 1. إضافة عنوان جديد
const addAddress = catchError(async (req, res, next) => {
   let user = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { addresses: req.body } }, // تم تعديل address إلى addresses لتطابق الـ Schema
      { new: true } // لإرجاع المستخدم بعد التحديث
   );

   if (!user) {
      return next(new AppError("User not found", 404));
   }
   
   // إرجاع مصفوفة العناوين الصحيحة
   res.json({ message: "success", address: user.addresses });
});

// 2. إزالة عنوان من القائمة
const removeFromAddress = catchError(async (req, res, next) => {
   let user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { addresses: { _id: req.params.id } } }, // استخدام addresses بالجمع
      { new: true }
   );

   if (!user) {
      return next(new AppError("User not found", 404));
   }
   
   res.json({ message: "success", address: user.addresses });
});

// 3. جلب قائمة العناوين للمستخدم الحالي
const getLoggedUserToAddress = catchError(async (req, res, next) => {
   let user = await User.findById(req.user._id);
      
   if (!user) {
      return next(new AppError("User not found", 404));
   }
   
   res.json({ message: "success", address: user.addresses });
});

export {
   addAddress,
   removeFromAddress,
   getLoggedUserToAddress
}