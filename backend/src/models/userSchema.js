import mongoose, {Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    avatarImage:{
        type: String,
    },
    isEmailVerified:{
        type: Boolean,
        default: false
    },
    otp:{
        type: String,
        required: true
    },
    otpExpiry:{
        type: Date,
        default: new Date(Date.now()+3600000)
    },
    refreshToken:{
        type: String,
    },
    refreshTokenExpiry:{
        type: Date,
    },
    gitHubUsername:{
        type: String,
    },
    bankName:{
        type: String
    },
    accountNumber:{
        type: Number,
    },
    IFSC:{
        type: String
    },
    PAN: {
        type: String
    }

},{timestamps: true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) next()

    this.password = await bcrypt.hash(this.password,10)
    
})

userSchema.methods.isPasswordCorrect = async function(password){
    if(!password) return false
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken = async function(){
    return jwt.sign({
        id: this._id
    },process.env.JWT_SECRET,{expiresIn: '10d'})
}
export const User = mongoose.model('User',userSchema);