<<<<<<< HEAD
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
=======
import express from 'express'
import {upload} from './middlewares/multer.middlewares.js'
import {uploadOnCloudinary} from './utils/cloudinary.js'
import dotenv from 'dotenv'
const app = express()



app.post('/',upload.single('photo'),async (req,res)=>{
    console.log(req.file.path)
    const uploadResult = await uploadOnCloudinary(req.file.path);
    res.json({
        url: uploadResult.url
    })

})

app.listen(process.env.PORT,()=>{
    console.log(`Server Listening on port ${process.env.port}`)
})
>>>>>>> 68f939ca050de92202f2377972ff55fe3d51e316
