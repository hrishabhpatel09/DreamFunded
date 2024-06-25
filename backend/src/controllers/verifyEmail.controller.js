import { User } from "../models/userSchema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export async function verifyEmail(req,res){
try {
        const {id} = req.params;
        const {otp} = req.body;
        if(!otp) return res.json(new ApiError(404, 'Otp is required to verify'))
        const client = await User.findOne(
            {
                username: id
            }
        )
        if(!client) return res.json(new ApiError(404,'Invalid Username'));
        const currDate = new Date(Date.now())
        const isOtpValid = client.otpExpiry > currDate;
        if(!isOtpValid) return res.status(410).json(new ApiError(410, 'Otp is Expired'))
        const isOtpCorrect = client.otp ===otp;
        if(!isOtpCorrect) return res.status(410).json(new ApiError(401, 'Invalid Otp'))
        client.isEmailVerified = true;
        await client.save();
        return res.status(200).json(new ApiResponse('Verification Successful',{success: true}))
} catch (error) {
    return res.json(new ApiError(500,'Server is Down!'))
}
}