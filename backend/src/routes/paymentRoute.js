import {Router} from 'express'
import { handleCheckout } from '../utils/stripe.js'

const router = Router()

router.post('/checkout',handleCheckout);

export default router