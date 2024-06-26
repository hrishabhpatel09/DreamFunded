import { User } from "../models/userSchema.js";
import { ApiResponse } from "../utils/ApiResponse.js";
export async function checkUsername(req,res){
    const {username} = req.params;
    console.log(username)
    const existingUserWithSameUsername = await User.findOne({username:username});
    if(!existingUserWithSameUsername){
        res.status(200).json(new ApiResponse('Username is Available',{isAvailable: true}))
    }else{
        res.status(200).json(new ApiResponse('Username is Already Taken',{isAvailable: false}))
    }
}