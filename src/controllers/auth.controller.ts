import {Request , Response} from 'express';
import prisma from '../config/db';
import {hashSync, compareSync} from 'bcrypt';
import lodash from 'lodash';

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

    return res.status(201).json(
        lodash.pick(newUser,['id','username','email','role'])
    );

} catch(error:any){
    return res.status(500).json({ error: "An unexpected error occurred." });
}}



