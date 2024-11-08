import { errorHandler } from "./errors";
import vehiclesRouter from "./vehicles/router";
import express from "express";

const app = express();

app.use(express.json());

app.use("/vehicles", vehiclesRouter);

app.use(errorHandler);

export default app;
