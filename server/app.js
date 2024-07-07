import express from "express";
import userRouter from './routes/userRoute.js'
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config({path : './.env'})

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000

connectDB(mongoURI)

const app = express();

app.use(express.json())
app.use(cookieParser())


app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(port, ()=>{
    console.log('server listening port ' + port)
})