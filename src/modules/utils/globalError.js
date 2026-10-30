

// // export const globalError=(err,req,res,next)=>{
// //     res.status(err.status||500)
// //     .json({message:err.message
// //         ||"Internet srever Error",
// //          stack:err.stack})
// // }
// export const globalError = (err, req, res, next) => {

//     // duplicate key
//     if (err.code === 11000) {
//         return res.status(409).json({
//             message: "Duplicate field value",
//             field: Object.keys(err.keyValue)
//         })
//     }

//     res.status(err.statusCode || 500).json({
//         message: err.message
//     })
// }

export const globalError = (err, req, res, next) => {

    // duplicate key error (MongoDB)
    if (err.code === 11000) {
        return res.status(409).json({
            status: "fail",
            message: "Duplicate field value",
            field: err.keyValue
        })
    }

    // mongoose validation error
    if (err.name === "ValidationError") {
        let errors = Object.values(err.errors).map(el => el.message)

        return res.status(400).json({
            status: "fail",
            message: errors
        })
    }

    // default error
    res.status(err.statusCode || 500).json({
        status: err.status || "error",
        message: err.message || "Internal Server Error"
    })
}