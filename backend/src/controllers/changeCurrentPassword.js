import { User } from "../models/userSchema.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const changeCurrentPassword =asyncHandler(async(req,res)=>{
    const {oldPassword , newPassword }=req.body

    const user = await User.findById(req.user?._id)
   const isPasswordCorrect=await user.isPasswordCorrect(oldPassword) 

   if(!isPasswordCorrect){
    throw new ApiError(400, "Invalid old password")
       }
       user.password = newPassword
       await user.save({validateBeforeSave:false})
       
       return res.status(200).json(new ApiResponse( "Password changed successfully", {}))

})