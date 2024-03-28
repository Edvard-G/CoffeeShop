import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const isDev: boolean = process.env.NODE_ENV === "development";

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.HOST,
  dialect: "postgres",
  logging: !isDev,
});

const connectdb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connecton has been established successfully.");
    if (isDev) {
      await sequelize.sync({ alter: isDev });
      console.log("Database models synchronized.")
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

export { sequelize, connectdb };
