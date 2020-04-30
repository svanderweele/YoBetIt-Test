import express, { Request, Response } from "express";
import ServerResponse from "../models/ServerResponse";
import { logger } from "../utilities/winston";
import { UserService, IUserService } from "./users.service";
import { User } from "../models/User";
import { UserDalSql, UserDalMongoDb } from "./users.dal";

class UsersController {
  public path = "/api/users";
  public router = express.Router();
  private userService: IUserService;
  constructor() {
    this.userService = new UserService(new UserDalMongoDb());
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getUser);
  }

  getUser = async (request: Request, response: Response) => {
    this.userService
      .getUsers()
      .then((users: User[]) => {
        response.send(new ServerResponse(true, "User retrieved", users[0]));
      })
      .catch((error) => {
        response.send(new ServerResponse(true, "Get user failed", { error }));
      });
  };
}

export default UsersController;
