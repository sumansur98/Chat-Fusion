import express from "express";
import userRouter from './routes/userRoute.js'
import chatRoute from "./routes/chatRoute.js";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import { createUser } from "./seeders/userSeeder.js";

dotenv.config({path : './.env'})

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000

connectDB(mongoURI)

//createUser(10)

const app = express();

app.use(express.json())
app.use(cookieParser())


app.use('/user', userRouter);
app.use('/chat', chatRoute)

app.get('/', (req, res) => {
    res.send('hello')
})

app.use(errorMiddleware)

app.listen(port, ()=>{
    console.log('server listening port ' + port)
})