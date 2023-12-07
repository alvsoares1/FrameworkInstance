import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import { AppDataSource } from './database/data-source';
import { routes } from './routes';

import './shared/container';
import { AppError } from './shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal Server Error - ${err.message}`,
    });
  }
);

AppDataSource.initialize()
  .then(async () => {
    app.listen(3333, () => console.log("App está rodando!"));
  })
  .catch((error) => console.log(error));