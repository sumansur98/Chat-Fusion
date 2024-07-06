import express from "express";
import userRouter from './routes/userRoute.js'


const app = express();

app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(3000, ()=>{
    console.log('server listening port 3000')
})