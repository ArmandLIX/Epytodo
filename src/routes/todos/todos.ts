import { Router } from "express";
import { verifyToken } from "../../middleware/auth";
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./todos.controller";

const router = Router();

router.get("/", verifyToken, getAllTodos);
router.get("/:id", verifyToken, getTodoById);
router.post("/", verifyToken, createTodo);
router.put("/:id", verifyToken, updateTodo);
router.delete("/:id", verifyToken, deleteTodo);

export default router;
