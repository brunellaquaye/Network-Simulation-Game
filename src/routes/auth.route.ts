// routes for authentication
import express from 'express'

import {signup} from '../controllers/auth.controller'
import { userValidator } from '../middleware/validator';



const router = express.Router();

router.route('/')
.post(userValidator,signup)




 export default router
