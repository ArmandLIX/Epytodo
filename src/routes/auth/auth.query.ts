import { db } from "../../config/db";
import bcrypt from "bcryptjs";

export const findUserByEmail = async (email: string) => {
  const [rows]: any = await db.query(
    "SELECT * FROM user WHERE email = ?",
    [email]
  );
  return rows[0] ?? null;
};

export const createUser = async (
  email: string,
  name: string,
  firstname: string,
  password: string
): Promise<number> => {
  const hashed = await bcrypt.hash(password, 10);
  const [result]: any = await db.query(
    "INSERT INTO user (email, name, firstname, password) VALUES (?, ?, ?, ?)",
    [email, name, firstname, hashed]
  );
  return result.insertId as number;
};

export const verifyCredentials = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.password);
  return valid ? user : null;
};
