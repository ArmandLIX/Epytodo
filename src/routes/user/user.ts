import { Router } from "express";
import { verifyToken } from "../../middleware/auth";
import {
  getMe,
  getMyTodos,
  getUserByIdentifier,
  updateUser,
  deleteUser,
} from "./user.controller";

const router = Router();

router.get("/", verifyToken, getMe);
router.get("/todos", verifyToken, getMyTodos);
router.get("/:identifier", verifyToken, getUserByIdentifier);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
