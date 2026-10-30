
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
    
    category:{
        type:Types.ObjectId,
        ref:"Category"
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User'
    }

},{timestamps:true,
    versionKey:false
})
schema.post('init',async(doc)=>{
        doc.image=process.env.BASE_URL + "supCategories/" + doc.image ;
})

export const SubCategory = mongoose.model('SubCategory',schema)