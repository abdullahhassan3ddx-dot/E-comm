import mongoose, { Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

const schema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required']
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    password: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    passwordChangedAt: Date,
    wishList:[{type:Types.ObjectId,ref:'Product'}],
    addresses:[{
        city:String,
        phone:String,
        street:String
    }],
}, {
    timestamps: true,
    versionKey: false
});

schema.pre("save",function(){
    this.password=bcrypt.hashSync(this.password,8)
})
schema.pre("findByIdAndUpdate",function(){
    this._update.password=bcrypt.hashSync(this._update.password,8)
    
    
})

export const User = mongoose.model('User', schema);