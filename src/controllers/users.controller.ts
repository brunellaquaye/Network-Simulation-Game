// src/controllers/admin.controller.ts
import { Request, Response } from "express";
import prisma from "../config/db";
import { hashSync } from "bcrypt";


// controller for super admin to use to create users and assign them roles
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;

    if (!["admin", "player"].includes(role.toLowerCase())) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashSync(password, 10),
        role: role.toLowerCase(),
      },
    });

    return res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};


// Allow superadmin to view all users
export const getAllUsers = async (req:Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, email: true, role: true ,createdAt: true},
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};



// edit user roles
export const updateUserRole = async (req: Request, res: Response)=>{
  try{
    const id = Number(req.params.id);
    const{role} = req.body;


    if (!["superadmin","admin","player"].includes(role)){
      return res.status(400).json({error: "Role is invalid"})
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { role}
    })

    res.json({message: "User's role has been updated", user: updated })

  }catch(error){
    res.status(500).json({error : "User's role has not been updated"})
  }
    

}

// Update user fields
export const updateUserDetails = async (req: Request, res:Response) =>{
  try {
    const id = Number(req.params.id);
    const updates = req.body;

    const permanentFields = ['id','createdAt','updatedAt']

for (const field of permanentFields){
  if (updates[field]){
    res.status(400).json({message: `The ${field} cannot be changed`});
  }
}
//  Password being updated is hashed again
    if (updates.password) {
      updates.password = hashSync(updates.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updates,
      select: { id: true, username: true, email: true, role: true },
    });
    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
    }catch{
        
    res.status(500).json({ message: 'Error occured while updating user details' });
    }
  

  }











export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};


