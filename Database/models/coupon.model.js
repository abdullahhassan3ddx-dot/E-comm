


import mongoose, { Schema } from "mongoose";


const schema=new Schema({
    code:{
      type:String,
      unique:true
    },
    discount:Number,
    expires:Date

},{timestamps:true,
    versionKey:false
})


export const Coupon = mongoose.model('Coupon',schema)