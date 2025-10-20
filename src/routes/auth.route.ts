
// routes for authentication and authentication
import express from 'express'

import {signup,signin} from '../controllers/auth.controller'
import { userValidator,signinValidator } from '../middleware/validator';
import { authorizeRoles } from '../middleware/authorizeRole';
import { authMiddleware} from '../middleware/authMiddleware'



const router = express.Router();

router.post('/signup',userValidator,signup)
router.post('/signin',signinValidator, signin)



 export default router
