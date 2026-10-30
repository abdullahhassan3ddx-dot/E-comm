import { Router } from 'express';
import { changePassword, signin, signup } from './user.controller.js';
import { checkEmail } from '../middleware/checkEmailExis.js';

const authRouter = Router();

// استخدام الطريقة المباشرة لكل مسار
authRouter.post('/signup', checkEmail, signup);
authRouter.post('/signin', signin); // غالباً الsignin لا يحتاج checkEmail بنفس طريقة الsignup
authRouter.patch('/changePassword', changePassword); // غالباً الsignin لا يحتاج checkEmail بنفس طريقة الsignup

export default authRouter;