import mysql, { MysqlError, FieldInfo, Query, queryCallback } from "mysql";
import { logger } from "./utilities/winston";
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 8889,
  password: "root",
  database: "YoBetIt",
  multipleStatements: true,
});

class Database {
  static query = (query: string) => {
    return new Promise((resolve, reject) => {
      connection.query(
        query,
        (error: MysqlError, results?: any, fields?: FieldInfo[]) => {
          if (error) {
            logger.error(error);
            return;
          }
          resolve(results);
        }
      );
    });
  };
}

export default Database;
