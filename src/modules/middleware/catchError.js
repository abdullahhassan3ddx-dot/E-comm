// import { AppError } from "./appError.js"



// export const catchError =(callBack)=>{
//     return(req,res,next)=>{
//         callBack(req,res,next).catch((err)=>{
//             next(new AppError(err,500))
//         })
//     }
// }
import { AppError } from "./appError.js"

export const catchError = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            next(new AppError(err.message || "Internal Server Error", 500))
        })
    }
}