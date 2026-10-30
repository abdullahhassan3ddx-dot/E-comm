import slugify from 'slugify';
import { User } from '../../../Database/models/user.model.js';
const addUser = async (req, res, next) => {
    // توليد الـ slug من الاسم
    req.body.slug = slugify(req.body.name); 

    // الطريقة الأولى: إنشاء كائن ثم حفظه
    let user = new User(req.body);
    await user.save(); // تم التصحيح هنا (استخدام user الصغير وليس User الكبير)

    // أو يمكنك استخدام الطريقة المختصرة المباشرة:
    // let user = await User.create(req.body);

    res.status(201).json({ message: "success", user });
}

const allUsers = async (req, res, next) => {
    let users = await User.find();
    res.json({ message: "success", users });
}

const getUser = async (req, res, next) => {
    let user = await User.findById(req.params.id);
    res.json({ message: "success", user });
}

const updateUser = async (req, res, next) => {
    // إذا تم إرسال اسم جديد في التحديث، قم بتحديث الـ slug أيضاً
    if (req.body.name) {
        req.body.slug = slugify(req.body.name);
    }
    
    let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "success", user });
}

const deleteUser = async (req, res, next) => {
    let user = await User.findByIdAndDelete(req.params.id);
    res.json({ message: "success", user });
}

export {
    addUser,
    allUsers,
    getUser,
    updateUser,
    deleteUser
};