import { User } from "../models/userSchema.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const updateUserAvatar = asyncHandler(async(req,res)=>{
    const avatarLocalPath=req.file?.path 
    if(!avatarLocalPath){
        throw new ApiError(400 , "Avatar file is missing")
    }


    
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if(!avatar.url){
        throw new ApiError(400 , "Error while uploading on avatar")

    }
 const user = await User.findByIdAndUpdate(
    req.user?._id, 
    {
        $set:{
            avatar:avatar.url
           
        }
    }, {new:true}
 ).select("-password")

 return res
 .status(200)
 .json(
    new ApiResponse( "avatar updated successfully" , user)
 )
})