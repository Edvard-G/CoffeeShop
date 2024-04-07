import { RequestHandler } from "express";
import { hashPassword, authenticateUser } from "../util/helper.util";
// import User from "../models/userModel";
import {User} from '../models/associations'
import { UserAttributes } from "../types/types";

export const loginUser: RequestHandler = async (req, res, next) => {
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

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await User.findAll();
    const usersData = users.map((user) => {
      const { password, ...userWithoutPassword } = user.get({ plain: true });
      return userWithoutPassword;
    });
    res.json(usersData);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || "Unexected error occured" });
  }
};

export const signUp: RequestHandler = async (req, res, next) => {
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

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || "Unexected error occured" });
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateUserData = req.body;

    const allowedUpdatedFields = [
      "first_name",
      "last_name",
      "email",
      "password",
    ];

    const updateFields = Object.keys(updateUserData);
    const isValidUpdate = updateFields.every((field) =>
      allowedUpdatedFields.includes(field)
    );

    if (!isValidUpdate) {
      return res.status(400).json({ message: "Invalid update data" });
    }

    if (updateUserData.password) {
      updateUserData.password = await hashPassword(updateUserData.password);
    }

    const [updatedRows] = await User.update(updateUserData, { where: { id } });

    if (updatedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || "An unexpected error occured" });
  }
};
