import bcrypt from 'bcrypt';
import { User } from '../../../Database/models/user.model.js';
import  jwt  from 'jsonwebtoken';
import { AppError } from '../middleware/appError.js';
import { catchError } from '../middleware/catchError.js';
const signup =catchError(async (req, res, next) => {
    let user = new User(req.body)
    await   user.save()
        let token =jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
        return res.json({message:'success',token}) 
})
const signin =catchError(async (req, res, next) => {
    let user = await User.findOne({email:req.body.email})
    if (user&&bcrypt.compareSync(req.body.password,user.password)) {
        let token =jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
        return res.json({message:'success',token}) 
        
    }
    return next(new AppError('inccrct email or password',401))
})
 
 
const changePassword =catchError(async (req, res, next) => {
    let user = await User.findOne({email:req.body.email})
    if (user&&bcrypt.compareSync(req.body.oldPassword,user.password)) {
        let user = await User.findOneAndUpdate({email:req.body.email},{password:req.body.newPassword,passwordChangedAt : Date.now()},{new:true})
        let token =jwt.sign({userId:user._id,role:user.role},'myNameIsAbdo')
        return res.json({message:'success',token})        
    }
    return next(new AppError('inccrct email or password',401))
})
const protectedRouters =catchError(async (req, res, next) => {
    let {token}=req.headers
    let userPayload=null;
    if (!token) return next(new AppError('token is inprovded'))    
    jwt.verify(token,'myNameIsAbdo',(err,payload)=>{
        if(err) return next(new AppError('token invaild...login again'))
            userPayload=payload
            console.log(userPayload);            
    })
    let user=await User.findById(userPayload.userId)
    if (!user) return next(new AppError('user is not found..'))
    if (user.passwordChangedAt) {
        let time = parseInt(user.passwordChangedAt.getTime() / 1000)
        if (time>userPayload.iat) return next(new AppError('token invaild'))
    }    
        req.user=user
        next()    
        }
    )
 
const allowedTo = (...roles) => {
    return catchError(async (req, res, next) => {
        // التحقق مما إذا كان دور المستخدم موجوداً ضمن الأدوار المسموحة
        if (roles.includes(req.user.role)) {
            return next(); // السماح بالمرور
        }
        
        // إذا لم يكن مصرحاً له، يتم إرجاع خطأ 403 (Forbidden)
        return next(new AppError('you are not authorized to access this endpoint', 403));
    });
};
 
   

export {
    signup,
    signin,
    changePassword,
    protectedRouters,
    allowedTo

    };