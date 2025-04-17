import  express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";
const app=express();
const PORT=process.env.PORT||5000;
app.use("/api/auth",authRoutes);
app.listen(PORT,()=>{
    console.log(`server is running port ${PORT}`);
    connectMongoDB();
});