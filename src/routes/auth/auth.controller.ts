import { Request, Response } from "express";
import * as authService from "./auth.query";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, firstname, password } = req.body;
    if (!email || !name || !firstname || !password)
      return res.status(400).json({ msg: "Bad parameter" });

    const existing = await authService.findUserByEmail(email);
    if (existing)
      return res.status(409).json({ msg: "Account already exists" });

    const insertId = await authService.createUser(email, name, firstname, password);
    const token = jwt.sign(
      { id: insertId, email },
      process.env.SECRET as string,
      { expiresIn: "1h" }
    );
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Bad parameter" });

    const user = await authService.verifyCredentials(email, password);
    if (!user)
      return res.status(401).json({ msg: "Invalid Credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET as string,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};
