export const handleRegister = async(req,res) =>{
    try {
        const uploadResult = await uploadOnCloudinary(req.file.path);
        console.log(uploadResult.url)
    } catch (error) {
        console.log('Unable to register User')
    }
}