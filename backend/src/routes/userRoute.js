import {Router} from 'express'
import {registerUser, checkUsername, loginUser , logoutUser, verifyEmail, forgetPasswordHandler, forgetPasswordVerify} from '../controllers/index.js'
import { upload } from '../middlewares/multer.middlewares.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()


router.get('/',(req,res)=>{
    res.send("HII")
})
router.get('/checkUsername/:username',checkUsername) // to check whether username is available or not
router.post('/register',upload.single('avatarImage'),registerUser) // to register user
router.post('/login',loginUser)
router.post('/verifyEmail/:id',verifyEmail)
router.post('/logout',verifyJWT,logoutUser)
router.get('/forget/:id',forgetPasswordHandler)
router.get('/forget/:id/verify',forgetPasswordVerify)

export default router