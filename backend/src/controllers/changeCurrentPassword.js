import { User } from "../models/userSchema.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const changeCurrentPassword =asyncHandler(async(req,res)=>{
    const {oldPassword , newPassword }=req.body

    const user = await User.findById(req.user?._id)
   const isPasswordCorrect=await user.isPasswordCorrect(oldPassword) // since we used async while declaring this method in user.models.js this means 
//    it will take some time therefore need to use await here
// isPasswordCorrect this is custom schema mehtod declared in uer.models.js
   if(!isPasswordCorrect){
    throw new ApiError(400, "Invalid old password")
       }
       user.password = newPassword// this sets old password to new passwprd
       await user.save({validateBeforeSave:false})
       
       return res.status(200).json(new ApiResponse( "Password changed successfully", {}))

})