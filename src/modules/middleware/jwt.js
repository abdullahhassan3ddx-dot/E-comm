import jwt from 'jsonwebtoken'
import { AppError } from './appError.js'



export const verifyToken =async(req,res,naxt) => {
    let {token}=req.headers
    jwt.verify(token,"myNameIsAbdo",async(err,decoded)=>{
        if (err) return naxt(new AppError('token invaild',409)) 
            req.user=decoded
        naxt()

    })
}