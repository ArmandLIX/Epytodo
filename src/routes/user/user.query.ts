import { db } from "../../config/db";
import bcrypt from "bcryptjs";

export const findUserById = async (id: number) => {
  const [rows]: any = await db.query("SELECT * FROM user WHERE id = ?", [id]);
  return rows[0] ?? null;
};

export const findUserByEmail = async (email: string) => {
  const [rows]: any = await db.query("SELECT * FROM user WHERE email = ?", [email]);
  return rows[0] ?? null;
};

export const findTodosByUserId = async (userId: number) => {
  const [rows]: any = await db.query("SELECT * FROM todo WHERE user_id = ?", [userId]);
  return rows;
};

export const updateUser = async (
  id: number,
  email: string,
  password: string,
  name: string,
  firstname: string
) => {
  const hashed = await bcrypt.hash(password, 10);
  await db.query(
    "UPDATE user SET email = ?, password = ?, name = ?, firstname = ? WHERE id = ?",
    [email, hashed, name, firstname, id]
  );
  return findUserById(id);
};

export const deleteUser = async (id: number) => {
  await db.query("DELETE FROM user WHERE id = ?", [id]);
};
