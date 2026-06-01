import "dotenv/config";
import express, { Request, Response } from "express";
import path from "path";

import authRouter from "./routes/auth/auth";
import userRouter from "./routes/user/user";
import todosRouter from "./routes/todos/todos";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/users", userRouter);
app.use("/todos", todosRouter);

app.use(express.static(path.join(process.cwd(), "public")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});