import { Request, Response, NextFunction, RequestHandler } from "express";
import { hashPassword, authenticateUser } from "../util/helper.util";
import User from "../models/userModel";
import { UserAttributes } from "../types/types";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
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
      res.status(500).send("An error occurred");
    }
  }
};

export const signUp: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      email,
      first_name,
      last_name,
      password,
      role,
      date_of_birth,
      gender,
    } = req.body as UserAttributes;

    if (!email || !password || !first_name || !last_name || !role) {
      return res
        .status(400)
        .json({ message: "Please fill out all required data" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with that email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      email,
      first_name,
      last_name,
      password: hashedPassword,
      role,
      date_of_birth,
      gender,
    });

    const { password: _, ...userResponse } = newUser.get({ plain: true });
    res.status(201).json({
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
