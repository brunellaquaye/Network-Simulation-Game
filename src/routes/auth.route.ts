
// routes for authentication
import express from 'express'

import {signup,signin} from '../controllers/auth.controller'
import { userValidator,signinValidator } from '../middleware/validator';



const router = express.Router();

router.post('/signup',userValidator,signup)
router.post('/signin',signinValidator, signin)



 export default router
