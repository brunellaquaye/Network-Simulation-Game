import {Request , Response} from 'express';
import prisma from '../config/db';
import {hashSync, compareSync} from 'bcrypt';
import {pick} from 'lodash';
import * as jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET! ;

export const signup = async(req:Request, res:Response)=>{
    try {
    const {email, password, username} = req.body;

    const oldUser = await prisma.user.findFirst({where: {email}})
    if (oldUser){
        return res.status(400).json({error: 'User already exist with this email'});
    }
    
    const newUser = await prisma.user.create({
        data:{
            username,
            email,
            password:hashSync(password, 10),
            // role,
        }
    })

     // Generate token
    const expiresIn = 3600;
    const token = jwt.sign(
            { id: newUser.id }, 
        JWT_SECRET, 
            { expiresIn: "1h" });

    res.cookie('token', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, 
    });

    // Return user info with
    return res.status(201).json({
        token,
        expiresIn,
        user: pick(newUser, ['id', 'username', 'email','role']),
    });



} catch(error:any){
    return res.status(500).json({ error: "An unexpected error occurred." });
}}








export const signin = async(req:Request, res:Response)=>{
    try {
    const {email, password, role} = req.body;
    
    const oldUser = await prisma.user.findFirst({where: {email}})
    if (!oldUser){
        
        return res.status(400).json({error: 'User does not exist with this email'});
    }
    
    if(!compareSync(password, oldUser.password)){
        // throw createHttpError.Error('Incorrect password or username')
        return res.status(400).json({ error: 'Incorrect password or username' });

        // Error('Incorrect password or username')
    }
  // Generate token
    const expiresIn = 3600;
    const token = jwt.sign(
            { id: oldUser.id ,role: oldUser.role}, 
        JWT_SECRET, 
            { expiresIn: "1h" });

    res.cookie('token', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, 
    });

    // Return user info without the token
    res.json({
        token,
        expiresIn,
        user: pick(oldUser, ['id', 'username', 'email', 'role']),
    });


} catch(error:any){
    console.error(error);
    return res.status(500).json({ error: "An unexpected error occurred." });
}}



