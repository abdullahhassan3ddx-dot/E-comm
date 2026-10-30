import mongoose, { Schema, Types } from "mongoose";

const schema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required'], // تم تصحيح رسالة الخطأ لتتناسب مع الحقل
        unique: true,
        trim: true,
        minLength: [2, 'too short product title']
    },
    slug: {
        type: String,
        lowercase: true, // تم تصحيح lowerCase إلى lowercase
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: [30, 'too short description'], // تم تصحيح min إلى minlength
        maxlength: [3000, 'too long description']  // تم تصحيح max إلى maxlength
    },
    imageCover: String,
    images: [String],
    price: {
        type: Number,
        required: [true, 'price is required'],
        min: 0
    },
    priceAfterDiscount: {
        type: Number,
        min: 0
    },
    sold: {
        type: Number,
        default: 0,
        min: 0
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    category: {
        type: Types.ObjectId,
        ref: "Category",
        required: [true, 'category is required']
    },
    subcategory: {
        type: Types.ObjectId,
        ref: "SubCategory"
    },
    brand: {
        type: Types.ObjectId,
        ref: "Brand"
    },
    rateAvg: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    rateCount: {
        type: Number,
        default: 0,
        min: 0
        // تم حذف max: 5 من هنا لأن هذا عدد المقيمين وليس التقييم نفسه
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false, toJSON: { virtuals: true } ,id:false
});


schema.virtual('myReviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product'
});
schema.pre('findOne',function () {
   this.populate('myReviews')
})

// Middleware لتعديل روابط الصور عند جلب البيانات
schema.post('init', async (doc) => {
    if (doc.imageCover) doc.imageCover = process.env.BASE_URL + "products/" + doc.imageCover;
    if (doc.images) doc.images = doc.images.map(img => process.env.BASE_URL + "products/" + img);
});

export const Product = mongoose.model('Product', schema);