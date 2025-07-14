import mongoose from "mongoose";
export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://macherlajahnavi:HC4wIJHEECUWvCwc@cluster0.za31jdg.mongodb.net/food-delivery').then(()=>console.log("DB Connected"));
}
