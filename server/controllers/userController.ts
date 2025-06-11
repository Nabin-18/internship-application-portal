import prisma from "../config/db";
import type { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY || "default_secret";
console.log(secretKey) // Load from .env file

type UserData = {
  name: string;
  email: string;
  password: string;
};
//signup controller

export const signUpController = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      res.status(409).json({
        message: "User already exists!",
       
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await prisma.user.create({
      data: { email, name, password: hashedPassword }
    });

    res.status(201).json({
      message: "User created successfully",
      data: createUser
    });

  } catch (error) {
    console.error("Error occurred during signup:", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};

//login controller
export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      secretKey,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: "Login successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    console.error("Error occurred during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
