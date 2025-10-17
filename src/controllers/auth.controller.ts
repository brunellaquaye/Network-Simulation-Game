import {Request , Response} from 'express';
import prisma from '../config/db';
import {hashSync, compareSync} from 'bcrypt';
import {pick} from 'lodash';
import * as jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET! ;

export const signup = async(req:Request, res:Response)=>{
    try {
    const {email, password, username, role} = req.body;

    const oldUser = await prisma.user.findFirst({where: {email}})
    if (oldUser){
        return res.status(400).json({error: 'User already exist with this email'});
    }
    
    const newUser = await prisma.user.create({
        data:{
            username,
            email,
            password:hashSync(password, 10),
            role,
        }
    })

    return res.status(201).json(pick(newUser,['id','username','email','role'])
    );

} catch(error:any){
    return res.status(500).json({ error: "An unexpected error occurred." });
}}


export const signin = async(req:Request, res:Response)=>{
    try {
    const {email, password, role} = req.body;

    // checking if all fields are valid
  
    // Check if user already exists
    const oldUser = await prisma.user.findFirst({where: {email}})
    if (!oldUser){
        
        return res.status(400).json({error: 'User does not exist with this email'});
    }
    
    if(!compareSync(password, oldUser.password)){
        throw Error('Incorrect password or username')
    }
  // Generate token
    const token = jwt.sign({ id: oldUser.id }, JWT_SECRET, { expiresIn: "1h" });

    // Set token in an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevents JavaScript access
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      sameSite: 'strict', // Prevents CSRF attacks
      maxAge: 3600000, // 1 hour in milliseconds
    });

    // Return user info without the token
    res.json({
      user: pick(oldUser, ['id', 'username', 'email', 'role']),
    });
} catch(error:any){
    console.error(error);
    return res.status(500).json({ error: "An unexpected error occurred." });
}}
