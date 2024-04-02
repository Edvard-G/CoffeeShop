import bcrypt from "bcrypt";
import User from "../models/userModel";
import { sequelize } from "../config/db";

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const authenticateUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const user = await User.findOne({
    where: sequelize.where(
      sequelize.fn("LOWER", sequelize.col("email")),
      sequelize.fn("LOWER", email)
    ),
  });

  if(user && (await bcrypt.compare(password, user.password))) {
    return user
  }
  return null;
};

export {hashPassword, authenticateUser};
