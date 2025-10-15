import {Request , Response} from 'express';
import prisma from '../config/db';
import {hashSync, compareSync} from 'bcrypt';


export const signup = async(req:Request, res:Response)=>{
    try {
    const {email, password, username, role} = req.body;

    // checking if all fields are valid
  
    // Check if user already exists
    const oldUser = await prisma.user.findFirst({where: {email}})
    if (oldUser){
        
        return res.status(400).json({error: 'User already exist with this email'});
    }
    // if user does not exist, we proceed to create the user
    const newUser = await prisma.user.create({
        // this is the info we use to create the user
        data:{

            username,
            email,
            password:hashSync(password, 10),
            role,
        }
    })

    return res.status(201).json(
        newUser
        
    );

} catch(error:any){
    console.error(error);
    return res.status(500).json({ error: "An unexpected error occurred." });
}}