import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on("connected",()=>console.log("connected to database"));

    await mongoose.connect(`${process.env.DATABASE_URL}/mern-auth`)
};

export default connectDB;