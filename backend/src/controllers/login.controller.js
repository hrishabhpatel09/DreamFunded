import { User } from "../models/userSchema.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export async function loginUser(req,res){
    const {id, password} = req.body;
    if(!id || !password)return res.status(400).json(new ApiResponse('username/email & password is required',{}))
    const existingUser = User.findOne(
        {
            $or: [
                {
                    username: id
                },
                {
                    email: id
                }
            ]
        }
    )
    if(!existingUser)return res.status(404).json(new ApiResponse('Please register Before Login',{}))
    const isPasswordCorrect = await existingUser.isPasswordCorrect(password);
    if(!isPasswordCorrect) return res.status(401).json(new ApiResponse('Bad Credentials',{}))
    if(!existingUser.isEmailVerified) return res.status(401).json(new ApiResponse('User is not Verified'))
    
}