import express, { Request, Response } from "express";
import ServerResponse from "../../../client/src/models/ServerResponse";
import { logger } from "../../src/utilities/winston";
import userService from "./users.service";

class UsersController {
  public path = "/api/users";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getUser);
  }

  getUser = async (request: Request, response: Response) => {
    userService
      .getUser()
      .then((user) => {
        response.send(new ServerResponse(true, "User retrieved", user));
      })
      .catch((error) => {
        response.send(new ServerResponse(true, "Get user failed", { error }));
      });
  };
}

export default UsersController;
