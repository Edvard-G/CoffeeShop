import User from "../models/userModel";
import bcrypt from "bcrypt";

export const createUser = async (userData: User) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = await User.create({
    ...userData,
    password: hashedPassword,
  });
  return newUser;
};

const authenticateUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return null;
};

const generateToken = (user: any) => {
  // Token logic will be here
};

export default {
  authenticateUser,
  createUser
};
