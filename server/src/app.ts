import "./server";
import express from "express";
import cors from "cors";
import { logger } from "./utilities/winston";

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: any, port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use("/", controller.router);
    });
  }

  public listen() {
    if (process.env.NODE_ENV !== "test") {
      this.app.listen(this.port, () => {
        logger.info(
          `------------ Server started on port ${this.port} ------------`
        );
      });
    }
  }
}

export default App;
