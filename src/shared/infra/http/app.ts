import "reflect-metadata";

import "@shared/container";
import "express-async-errors";

import express, { NextFunction, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { route } from "./routes";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

createConnection();

app.use(route);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
