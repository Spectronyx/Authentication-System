import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const allowedOrigins = [
    "http://localhost:5173",
    "https://authentication-system-080k.onrender.com",
];

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);

//API ENDPOINTS
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use((req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
