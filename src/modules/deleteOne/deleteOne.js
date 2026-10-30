// import { AppError } from "../middleware/appError.js"
// import { catchError } from "../middleware/catchError.js"


// export const deleteOne=(modle)=>{
//     return catchError(async (req, res, next) => {

//     let document = await modle.findById(req.params.id)

//     if (!document) {
//         return next(new AppError("document not found", 404))
//     }

//     await document.findByIdAndDelete(req.params.id)

//     res.json({ message: "success", document })
// })
// }



import { catchError } from "../middleware/catchError.js";
import { AppError } from "../middleware/appError.js";

export const deleteOne = (modle) => {
    return catchError(async (req, res, next) => {
        let document = await modle.findById(req.params.id);

        if (!document) {
            return next(new AppError("document not found", 404));
        }

        // استخدام دالة deleteOne() الخاصة بالمستند نفسه وليست findByIdAndDelete
        await document.deleteOne();

        res.json({ message: "success", document });
    });
};