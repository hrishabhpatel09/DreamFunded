import express , {response} from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import userRouter from './routes/userRoute.js'
import connectDB from './db/index.js'


dotenv.config({
    path:'./.env'
})

const app=express();

app.use(cors())



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




