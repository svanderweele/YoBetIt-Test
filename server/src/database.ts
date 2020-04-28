import mysql, { MysqlError, FieldInfo, Query, queryCallback } from "mysql";
import { logger } from "./utilities/winston";
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 8889,
  password: "root",
  database: "YoBetIt",
});

class Database {
  static query = (query: string, callback: (rows? :any, fields?: FieldInfo[]) => void) => {
    connection.query(
      query,
      (error: MysqlError, results?: any, fields?: FieldInfo[]) => {
        if (error) {
          logger.error(error);
          return;
        }
        callback(results, fields);
        connection.end();
      }
    );
  };
}

export default Database;
