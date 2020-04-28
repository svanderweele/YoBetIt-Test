import Database from "../../src/database";
import { User } from "../../../client/src/models/User";

class UserService {
  static getUser = (): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
      try {
        Database.query(`SELECT * FROM users`).then(resolve);
      } catch (error) {
        reject(error);
      }
    });
  };
}

export default UserService;
