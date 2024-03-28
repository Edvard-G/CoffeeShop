import bcrypt from "bcrypt";
import User from "../models/userModel";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const authenticateUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const user = await User.findOne({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }
  return null;
};
