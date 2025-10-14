// routes for authentication
import express from 'express'
// import {Router} from 'express'
import {signup} from '../controllers/auth.controller'
import { userValidator } from '../middleware/validator';



const router = express.Router();

router.route('/')
.post(userValidator,signup)


// const authenticationRoutes:Router = Router()

// Here defines the authentication routes

// we will define all the routes here for get, post and co
// authenticationRoutes.get('/login',login )

 export default router
