import express, { Express, Request, Response } from "express";
import { connectdb, sequelize } from "./config/db";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import cartRoutes from "./routes/cartRoutes";
import "./models/associations";

dotenv.config();

connectdb();
const app: Express = express();
const port: number | string = process.env.PORT || 8000;
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "fail",
    message: `Route:${req.originalUrl} does not exist on this server`,
  });
});
sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Server started on ${port}`));
});
