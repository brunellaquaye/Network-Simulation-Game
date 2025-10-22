// src/controllers/admin.controller.ts
import { Request, Response } from "express";
import prisma from "../config/db";
import { hashSync } from "bcrypt";


// controller for super admin to use to create users like player or admin
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


// edit user



export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: Number(id) } });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};
