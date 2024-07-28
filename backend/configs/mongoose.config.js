import mongoose from "mongoose";
export const connectToDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connection to DB succesful!");
    }catch(err){
        console.log("Connection to DB failed:"+ err.message);
    }
}