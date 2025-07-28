import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
dotenv.config();

const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/api/users', userRouter);

app.listen(port, ()=>{
    console.log(`Sever is running on http://localhost:${port}`);
});