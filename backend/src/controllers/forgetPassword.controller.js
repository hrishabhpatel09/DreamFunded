import { User } from "../models/userSchema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateOtp } from "../utils/basicUtils.js";
import { sendEmail } from "../utils/nodemailer.js";

export async function forgetPasswordHandler(req,res){
    const {id} = req.params;
    if(!id) return res.status(404).json(new ApiError(404,'Please Provide Username/ Email'))
    try {
        const existingUser = await User.findOne(
            {
                $or: [{email: id},{username: id}]
            }
        )
        if(!existingUser) return res.status(404).json(new ApiError(404, 'User not Found'))
        existingUser.forgetPasswordOtp = generateOtp();
        existingUser.forgetPasswordOtpExpiry = new Date(Date.now()+3600000);
        await existingUser.save();
        await sendEmail({to: existingUser.email,type: "forget", code: existingUser.forgetPasswordOtp})
    } catch (error) {
        return res.status(400).json(new ApiError(400,'Something went wrong please try again',error))
    }
}

export async function forgetPasswordVerify(){
    const {otp} = req.body;
    if(!otp) return res.status(401).json(new ApiError(401, 'Otp is required!!'))
    const {id} = req.params;
    try {
        const existingUser = await User.findOne(
            {
                $or: [{email: id},{username: id}]
            }
        )
        if(!existingUser) return res.status(404).json(new ApiError(404,'Username not found',{success: false}))
        const isOtpCorrect = existingUser.forgetPasswordOtp === otp;
        if(!isOtpCorrect) return res.status(200).json(new ApiResponse('Invalid Otp',{success: false}));
        const currDate = new Date(Date.now());
        const isOtpValid = existingUser.forgetPasswordOtpExpiry > currDate;
        if(!isOtpValid) return res.status(200).json(new ApiResponse('Otp has been Expired please try Again',{success: false}))
        return res.status(200).json(new ApiResponse('Otp verification Successfull',{success: true}))
    } catch (error) {
        return res.status(400).json(new ApiError(400,'Something went wrong please try again',error))
    }
}

export async function setNewPassword(req,res){
    
}