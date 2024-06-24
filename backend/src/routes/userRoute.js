import {Router} from 'express'
import {registerUser, checkUsername, loginUser} from '../controllers/index.js'
import { upload } from '../middlewares/multer.middlewares.js'

const router = Router()


router.get('/',(req,res)=>{
    res.send("HII")
})
router.get('/checkUsername/:username',checkUsername) // to check whether username is available or not
router.post('/register',upload.single('avatarImage'),registerUser) // to register user
router.post('/login',loginUser);


export default router