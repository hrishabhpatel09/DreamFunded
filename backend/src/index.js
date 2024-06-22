import express , {response} from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import mongoose from 'mongoose'

dotenv.config({
    path:'./env'
})

const app=express();

// below we are creating route
app.get('/', (req,res)=>{
    console.log(req);
    return res.status(234).send('welocme')
})

app.use(cors())
app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server is running at port : ${process.env.PORT}`);
})

// connecting to database
const DB_NAME ="DreamFundedWebsite"
mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
.then(()=>{
    console.log("Database connected successfully");
    

})
.catch((error)=>{
    console.log("mongodb connection error" ,error);
});