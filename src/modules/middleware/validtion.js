import { AppError } from "./appError.js"


export function validate(schema) {
    return (req,res,next)=>{
        let {error}=schema.validate({image:req.file,...req.body,...req.params,...req.query})
        if (!error) {
            next()
        }else{
            let errMses=error.details.map(errMses=>error.message)
            next(new AppError(errMses,400))
        }
    }
}