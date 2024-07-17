import {Router} from 'express'
import { handleCheckout } from '../utils/stripe.js'

const router = Router()

router.post('/checkout',handleCheckout);
router.get('/success',(req,res)=>{
    console.log(req.query)
    console.log(req.params);
    console.log(req.body);
})

export default router