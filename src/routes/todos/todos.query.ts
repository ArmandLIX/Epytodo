import { db } from "../../config/db";

export const findAllTodosByUser = async (userId: number) => {
  const [rows]: any = await db.query(
    "SELECT * FROM todo WHERE user_id = ?",
    [userId]
  );
  return rows;
};

export const findTodoById = async (id: number) => {
  const [rows]: any = await db.query("SELECT * FROM todo WHERE id = ?", [id]);
  return rows[0] ?? null;
};

export const createTodo = async (
  title: string,
  description: string,
  due_time: string,
  status: string,
  userId: number
) => {
  const [result]: any = await db.query(
    "INSERT INTO todo (title, description, due_time, status, user_id) VALUES (?, ?, ?, ?, ?)",
    [title, description, due_time, status, userId]
  );
  return findTodoById(result.insertId as number);
};

export const updateTodo = async (
  id: number,
  title: string,
  description: string,
  due_time: string,
  status: string
) => {
  await db.query(
    "UPDATE todo SET title = ?, description = ?, due_time = ?, status = ? WHERE id = ?",
    [title, description, due_time, status, id]
  );
  return findTodoById(id);
};

export const deleteTodo = async (id: number) => {
  await db.query("DELETE FROM todo WHERE id = ?", [id]);
};
