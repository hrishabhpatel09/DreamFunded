import { User } from "../models/userSchema.js"

// creating this method which will be used to create refresh and access token while registering the user 
export const generateAccessAndRefreshTokens= async(userId)=>{
    try{
        const user=await User.findById(userId)
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()
        user.refreshToken=refreshToken// we save refreshToken that we generated in above step in database i.e. through user.refreshToken. here user = object
        await user.save({validateBeforeSave:false})///this line saves the refreshToekn in database
        // await because here saving info in db may take time
        //validateBeforeSave:false --> we used it because we are just saving one field here i.e. 
        // refreshToken and not other field but here password should also be there therefore we done validation 
        // at this point :false
// The user object, with the new refresh token, is saved back to the database.
// { validateBeforeSave: false } is an option that disables validation checks before saving. 
// This can be useful if you only want to update a single field and don't need to revalidate the entire user object.



        return {accessToken,refreshToken}
    }
    catch(error){
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}