


import mongoose, {  Schema, Types } from "mongoose";


const schema=new Schema({
    user:{type:Types.ObjectId,ref:'User'},
    orderItems:[{
        product:{type:Types.ObjectId,ref:'Product'},
        quantity:Number,
        price:Number
    }],
    totalOrderPrice:Number,
    shippingAddress:{
        city:String,
        phone:String,
        street:String
    },
    paymentType:{
        type:String,
        enum:['cash','card'],
        default:'cash'
    },
    isPiad:{
        type:Boolean,
        default:false
    },
    piadAt:Date,
    isDelivered:{
        type:Boolean,
        default:false
    },
    deliveredAt:Date
    

},{timestamps:true,
    versionKey:false
})


export const Order = mongoose.model('Order',schema)