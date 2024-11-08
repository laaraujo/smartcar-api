import { errorHandler } from "./errors";
import express from "express";

const app = express();

app.use(express.json());

app.use(errorHandler);

export default app;
