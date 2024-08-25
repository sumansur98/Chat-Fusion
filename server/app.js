import express from "express";
import userRouter from './routes/userRoute.js'
import chatRoute from "./routes/chatRoute.js";
import adminRoute from "./routes/adminRoute.js";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import { createUser } from "./seeders/userSeeder.js";
import { createGroupChats, createMessagesInAChat, createSingleChats } from "./seeders/chatSeeder.js";

dotenv.config({path : './.env'})

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "adsasdsdfsdfsdfd";

connectDB(mongoURI)

// createSingleChats(10);
// createGroupChats(10);
//createMessagesInAChat('66a7b44e1c7df571fc0fa0aa', 50)

const app = express();

app.use(express.json())
app.use(cookieParser())


app.use('/user', userRouter);
app.use('/chat', chatRoute)
app.use('/admin', adminRoute)

app.get('/', (req, res) => {
    res.send('hello')
})

app.use(errorMiddleware)

app.listen(port, ()=>{
    console.log('server listening port ' + port)
})

export { adminSecretKey };