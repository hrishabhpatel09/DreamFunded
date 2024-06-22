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