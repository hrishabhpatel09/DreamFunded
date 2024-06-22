export const generateOtp = () =>{
    const digits = "0123456789"
    let otp = "";
    for(let i=0;i<6;i++){
        const idx = Math.floor(Math.random()*10)
        otp+=digits[idx];
    }
    return otp;
}