
import mongoose, { Schema, Types } from "mongoose";


const schema=new Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        unique :true,
        trim:true,
        minLenght:2
        
    },
    slug:{
        type:String,
        lowerCase:true,
        required:true
    },
    image:String,
    createdBy:{
            type:Types.ObjectId,
            ref:'User'
        }

},{timestamps:true,
    versionKey:false
})
schema.post('init',async(doc)=>{
        doc.image=process.env.BASE_URL + "categories/" + doc.image ;
})

export const Category = mongoose.model('Category',schema)