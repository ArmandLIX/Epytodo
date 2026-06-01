import { Response } from "express";
import * as userService from "./user.query";

export const getMe = async (req: any, res: Response) => {
  try {
    const user = await userService.findUserById(req.userId);
    if (!user) return res.status(404).json({ msg: "Not found" });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getMyTodos = async (req: any, res: Response) => {
  try {
    const todos = await userService.findTodosByUserId(req.userId);
    res.status(200).json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getUserByIdentifier = async (req: any, res: Response) => {
  try {
    const { identifier } = req.params;
    const isId = /^\d+$/.test(identifier);

    if (isId && Number(identifier) !== req.userId)
      return res.status(403).json({ msg: "No access" });
    if (!isId && identifier !== req.userEmail)
      return res.status(403).json({ msg: "No access" });

    const user = isId
      ? await userService.findUserById(Number(identifier))
      : await userService.findUserByEmail(identifier);

    if (!user) return res.status(404).json({ msg: "Not found" });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateUser = async (req: any, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (id !== req.userId)
      return res.status(403).json({ msg: "No access" });

    const { email, password, firstname, name } = req.body;
    if (!email || !password || !firstname || !name)
      return res.status(400).json({ msg: "Bad parameter" });

    const user = await userService.findUserById(id);
    if (!user) return res.status(404).json({ msg: "Not found" });

    const updated = await userService.updateUser(id, email, password, name, firstname);
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteUser = async (req: any, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (id !== req.userId)
      return res.status(403).json({ msg: "No access" });

    const user = await userService.findUserById(id);
    if (!user) return res.status(404).json({ msg: "Not found" });

    await userService.deleteUser(id);
    res.status(200).json({ msg: `Successfully deleted record number: ${id}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};
