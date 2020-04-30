import Database from "../database";
import { User } from "../models/User";
import { IUserDAL } from "./users.dal";

export interface IUserService {
  getUsers: () => Promise<User[]>;
}

class UserService implements IUserService {
  private userDal: IUserDAL;
  constructor(dal: IUserDAL) {
    this.userDal = dal;
  }

  getUsers = (): Promise<User[]> => this.userDal.getUsers();
}

export { UserService };
