import express , {response} from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import userRouter from './routes/userRoute.js'
import connectDB from './db/index.js'
import cookieParser from "cookie-parser"

dotenv.config({
    path:'./.env'
})

const app=express();

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

// below we are creating route
app.get('/', (req,res)=>{
    console.log(req);
    return res.status(234).send('welocme')
})



app.listen(process.env.PORT || 5000, async()=>{
     await connectDB();
    console.log(`Server is running at port : ${process.env.PORT}`);
})




