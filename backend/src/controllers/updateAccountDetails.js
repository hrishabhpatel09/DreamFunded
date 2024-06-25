import { User } from "../models/userSchema.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const updateAccountDetails= asyncHandler(async(req,res)=>{
    const {username, email}= req.body
    if(!username || !email){
        throw new ApiError(400 , "All fields are required")
    }
    const user = await User.findByIdAndUpdate(
        req.user?._id, 
        {
            $set :{ 
                username:username,
                
                email:email
                
             } 
        } , 
        {new :true}
       
        ).select("-password")
        


        return res
        .status(200)
        .json(new ApiResponse( "Account details updated successfully", user))
})