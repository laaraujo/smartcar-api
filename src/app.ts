import { errorHandler } from "./errors";
import vehiclesRouter from "./vehicles/router";
import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/ping", (_req: Request, res: Response) => {
  res.send("pong");
});

app.use("/vehicles", vehiclesRouter);

app.use(errorHandler);

export default app;
