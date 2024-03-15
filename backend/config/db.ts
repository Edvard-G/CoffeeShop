import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const isDev: boolean = process.env.NODE_ENV === "development";

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "postgres",
  port: parseInt(process.env.DB_PORT || "5432"),
  logging: !isDev, 
});

const connectdb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    if (isDev) {
      await sequelize.sync({ alter: true });
      console.log("Database synchronized with alter option.");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

export { sequelize, connectdb };