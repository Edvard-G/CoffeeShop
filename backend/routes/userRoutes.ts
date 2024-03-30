import express from "express";
import {
  getUsers,
  loginUser,
  signUp,
  deleteUser,
  updateUser,
} from "../controllers/userController";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signUp);

router.get("/", getUsers);

router.put("/:id", updateUser)

router.delete("/:id", deleteUser);

export default router;
