
import mongoose from "mongoose";


export const dbConnne=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/comme').then(()=>{
    console.log("Database successfully");
    
})
}
