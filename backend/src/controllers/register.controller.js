import {ApiResponse} from '../utils/ApiResponse.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { User } from '../models/userSchema.js'
import {generateOtp} from '../utils/basicUtils.js'
import {sendEmail} from '../utils/nodemailer.js'
import fs from 'fs'

export const registerUser = async(req,res) =>{
    try {
        const {username, email, password} = req.body
        if(!username || !email || !password)return res.status(400).json(new ApiResponse('username,email & password is required',{}))
        const existingUser = await User.findOne({
              email: email    
        })
        if(existingUser) return res.status(400).json(new ApiResponse('Email already in Use',{}))
        let avatarImage = "";
        if(req.file){
            const response = await uploadOnCloudinary(req.file.path);
            if(response){
                avatarImage = response.url
                fs.unlinkSync(req.file.path)
            }else{
                fs.unlinkSync(req.file.path)
                res.status(503).json(new ApiResponse('Failed to Upload Avtar on Cloudinary',{}))
            }
        }
        const newUser = new User({
            username,
            email,
            password,
            avatarImage,
            otp: generateOtp(),
            otpExpiry: Date.now() + 600000,
        })

        const response  = await newUser.save();
        if(!response){
            res.status(500).json(new ApiResponse('Failed to register user',{data: 'none'}))
        }
        await sendEmail({to: newUser.email,type: "verify",code :Number(newUser.otp)});
        res.status(200).json(new ApiResponse('User Saved Successfully',{username: response.username,email: response.email, avatarImage: response.avatarImage}))
    } catch (error) {
        console.log('Unable to register User')
    }
}