import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import path from "path";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

// Fix for __dirname in ES modules

const allowedOrigins = [
    "http://localhost:5173",
    "https://authentication-system-080k.onrender.com",
    "https://authentication-system-rouge.vercel.app",
];

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    }),
);

//API ENDPOINTS

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);


app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
