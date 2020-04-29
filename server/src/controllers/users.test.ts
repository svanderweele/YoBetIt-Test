import request from "supertest";
import app from "../server";
import supertest from "supertest";
import { User } from "../../../client/src/models/User";

const callerApp = app.app;

describe("Get User", () => {
  it("returns user object", async () => {
    await request(callerApp)
      .get("/api/users/")
      .expect(200)
      .then((res: supertest.Response) => {
        expect(res.body).toHaveProperty("success", true);
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty<User>("data");
      });
  });
});

  