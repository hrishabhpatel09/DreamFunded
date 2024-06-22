import {Router} from 'express'
import {handleRegister} from '../controllers/index.js'
import { upload } from '../middlewares/multer.middlewares.js'

const router = Router()


router.get('/',(req,res)=>{
    res.send("HII")
})
router.post('/register',upload.single('avatarImage'),handleRegister)

export default router