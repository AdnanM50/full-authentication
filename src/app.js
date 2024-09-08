import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";
import authRouter from './routes/auth.route.js';
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);


export { app }