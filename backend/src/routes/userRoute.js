import {Router} from 'express'
import {registerUser} from '../controllers/index.js'
import { upload } from '../middlewares/multer.middlewares.js'

const router = Router()


router.get('/',(req,res)=>{
    res.send("HII")
})
router.post('/register',upload.single('avatarImage'),registerUser)

export default router