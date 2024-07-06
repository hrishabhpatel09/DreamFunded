import express , {response} from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import userRouter from './routes/userRoute.js'
import chatRouter from './routes/chatRoute.js'
import connectDB from './db/index.js'
import cookieParser from "cookie-parser"
import {createServer} from 'http'
import {Server} from 'socket.io'

dotenv.config({
    path:'./.env'
})

const app=express();
const server = createServer(app);
const io = new Server(server,{cors: {origin: 'http://localhost:5173'}});

let OnlineUser = [];
io.on("connection",(socket)=>{
        const newUser = {
            sokcetId : socket.id,
            username: socket.handshake.query.username
        }
        OnlineUser.push(newUser)
        console.log(OnlineUser)
        io.emit("Online",OnlineUser)
    socket.on("disconnect",()=>{
        OnlineUser = OnlineUser.filter((obj)=>obj.sokcetId!=socket.id)
        io.emit("Online",OnlineUser)    
    })
})


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json())// accept data in json and form
app.use(express.urlencoded({extended:true, limit:"16kb"}))// accept url  
app.use(express.static("public"))// used to save some images, favicon if needed in public folder
app.use(cookieParser())


//routes
app.use('/api/user',userRouter)
app.use('/api/chat',chatRouter)

// below we are creating route
app.get('/', (req,res)=>{
    console.log(req);
    return res.status(234).send('welocme')
})



server.listen(process.env.PORT || 5000, async()=>{
     await connectDB();
    console.log(`Server is running at port : ${process.env.PORT}`);
})




