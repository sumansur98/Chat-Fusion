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
import { Server } from "socket.io";
import { createServer } from "http";
import { NEW_MESSAGE } from "./constants/events.js";
import { getSockets } from "./lib/helpe.js";
import { Message } from "./models/messageModel.js";
import cors from 'cors'
import { v2 as cloudinary } from "cloudinary";

dotenv.config({ path: './.env' })


const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "adsasdsdfsdfsdfd";
const userSocketIDs = new Map();

connectDB(mongoURI)
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})

// createSingleChats(10);
// createGroupChats(10);
//createMessagesInAChat('66a7b44e1c7df571fc0fa0aa', 50)

const app = express();

app.use(cors({
    credentials : true,
    origin : ['http://localhost:5173','http://localhost:4173', process.env.CLIENT_URL]
}))
const server = createServer(app);
const io = new Server(server, {

});

app.use(express.json())
app.use(cookieParser())


app.use('/api/v1/user', userRouter);
app.use('/api/v1/chat', chatRoute)
app.use('/api/v1/admin', adminRoute)

app.get('/', (req, res) => {
    console.log('hello')
    res.send('hello')
})

io.use((socket, next) => {
    cookieParser()(
        socket.request,
        socket.request.res,
        async (err) => await socketAuthenticator(err, socket, next)
    );
});

io.on("connection", (socket) => {
    const user = socket.user;
    userSocketIDs.set(user._id.toString(), socket.id);

    socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
        const messageForRealTime = {
            content: message,
            _id: uuid(),
            sender: {
                _id: user._id,
                name: user.name,
            },
            chat: chatId,
            createdAt: new Date().toISOString(),
        };

        const messageForDB = {
            content: message,
            sender: user._id,
            chat: chatId,
        };

        const membersSocket = getSockets(members);
        io.to(membersSocket).emit(NEW_MESSAGE, {
            chatId,
            message: messageForRealTime,
        });
        io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });

        try {
            await Message.create(messageForDB);
        } catch (error) {
            throw new Error(error);
        }
    });
})

    app.use(errorMiddleware)

    server.listen(port, () => {
        console.log('server listening port ' + port)
    })

    export { adminSecretKey };