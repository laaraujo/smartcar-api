import { errorHandler } from "./errors";
import vehiclesRouter from "./vehicles/router";
import express, { Request, Response } from "express";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  failOnErrors: true,
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Smartcar API",
      version: "1.0.0",
    },
  },
  apis: ["./**/router.ts", "./**/schema.ts"],
};

const app = express();

app.use(morgan("tiny"));

app.use(express.json());

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJSDoc(swaggerOptions))
);

app.get("/ping", (_req: Request, res: Response) => {
  res.send("pong");
});

app.use("/vehicles", vehiclesRouter);

app.use(errorHandler);

export default app;
