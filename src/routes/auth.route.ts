
// routes for authentication
import express from 'express'

import {signup,signin} from '../controllers/auth.controller'
import { userValidator,signinValidator } from '../middleware/validator';



const router = express.Router();

router.route('/signup')
.post(userValidator,signup)
router.route('/signin')
.post(signinValidator, signin)



 export default router
