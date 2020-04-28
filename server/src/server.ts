import express from "express";
import { Request, Response } from "express";
import {logger} from './utilities/winston';

const app = express();

app.get(".", (request: Request, response: Response) => {
  logger.log('info', 'Hello World');
});

const PORT: number = +process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.log('info', `Server started on port ${PORT}`)
});
