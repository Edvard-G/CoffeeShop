import { Request, Response } from "express";
import userService from "../services/userService";
import User from "../models/userModel";


export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userService.authenticateUser(email, password);
    if (user) {
      res.json({ message: "Login successful", user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};


export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
          res.status(500).send('An error occurred')
      }
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const userData = req.body; 
    const newUser = await userService.createUser(userData); 
    
    

    res.status(201).json({
      message: 'User was created successfully',
      user: { 
        id: newUser.id,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
      },
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}; 
