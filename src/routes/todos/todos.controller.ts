import { Response } from "express";
import * as todosService from "./todos.query";

export const getAllTodos = async (req: any, res: Response) => {
  try {
    const todos = await todosService.findAllTodosByUser(req.userId);
    res.status(200).json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getTodoById = async (req: any, res: Response) => {
  try {
    const id = Number(req.params.id);
    const todo = await todosService.findTodoById(id);
    if (!todo) return res.status(404).json({ msg: "Not found" });
    if (todo.user_id !== req.userId)
      return res.status(403).json({ msg: "No access" });
    res.status(200).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const createTodo = async (req: any, res: Response) => {
  try {
    const { title, description, due_time, status } = req.body;
    if (!title || !description || !due_time)
      return res.status(400).json({ msg: "Bad parameter" });

    const todo = await todosService.createTodo(
      title, description, due_time, status ?? "not started", req.userId
    );
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateTodo = async (req: any, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existing = await todosService.findTodoById(id);
    if (!existing) return res.status(404).json({ msg: "Not found" });
    if (existing.user_id !== req.userId)
      return res.status(403).json({ msg: "No access" });

    const { title, description, due_time, status } = req.body;
    if (!title || !description || !due_time || !status)
      return res.status(400).json({ msg: "Bad parameter" });

    const updated = await todosService.updateTodo(id, title, description, due_time, status);
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteTodo = async (req: any, res: Response) => {
  try {
    const id = Number(req.params.id);
    const existing = await todosService.findTodoById(id);
    if (!existing) return res.status(404).json({ msg: "Not found" });
    if (existing.user_id !== req.userId)
      return res.status(403).json({ msg: "No access" });

    await todosService.deleteTodo(id);
    res.status(200).json({ msg: `Successfully deleted record number: ${id}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};
