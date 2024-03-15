import express, { Express } from "express";
import productRoutes from "./routes/productRoutes";
import cors from "cors";
import { connectdb } from "./config/db";
import dotenv from "dotenv";
import helmet from "helmet";
import userRoutes from "./routes/userRoutes";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
app.use(cors());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

connectdb()
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed. Exiting now...", error);
    process.exit(1);
  });
