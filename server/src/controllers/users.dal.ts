import { User } from "../models/User";
import Database from "../database";
import { MongoClient, MongoError, Db } from "mongodb";
import { logger } from "../utilities/winston";
import { resolve } from "dns";

export interface IUserDAL {
  getUsers: () => Promise<User[]>;
  updateUser: (user: User) => Promise<User>;
}

class UserDalSql implements IUserDAL {
  getUsers = (): Promise<User[]> => {
    return new Promise<User[]>((resolve, reject) => {
      try {
        Database.query(`SELECT * FROM users`).then(resolve);
      } catch (error) {
        reject(error);
      }
    });
  };

  updateUser = (user: User): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
      try {
        Database.query(
          `UPDATE users WHERE id=${user.id} SET money=${user.money}`
        ).then((value) => resolve(user));
      } catch (error) {
        reject(error);
      }
    });
  };
}

class UserDalMongoDb implements IUserDAL {
  private uri: string =
    "mongodb+srv://Simon:OOZeoX5bXGbWR9KS@cluster0-n4iai.gcp.mongodb.net/test?retryWrites=true&w=majority";
  private client: MongoClient = new MongoClient(this.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  private db: Db;

  constructor() {
    this.client
      .connect()
      .then((client) => {
        this.db = client.db("yobetittypescript");
      })
      .catch((error: MongoError) => logger.error(error.errmsg));
  }

  getUsers = (): Promise<User[]> => {
    return new Promise<User[]>((resolve, reject) => {
      try {
        this.db
          .collection("users")
          .find()
          .toArray(function (err: MongoError, result: User[]) {
            if (err) throw err;

            resolve(result);
          });
      } catch (error) {
        reject(error);
      }
    });
  };
  updateUser = (user: User): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
      try {
        this.db
          .collection("users")
          .updateOne({ id: user.id }, { $set: { money: user.money } });
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  };
}

export { UserDalSql, UserDalMongoDb };
