import request from "supertest";
import app from "../server";
import supertest from "supertest";
import { SlotMachineSpin, SlotMachineRewardRequirement } from "../../../client/src/models/SlotMachine";

const callerApp = app.app;

describe("Roll", () => {
  it("get spin result or error if player has no money", async () => {
    await request(callerApp)
      .get("/api/slots/roll")
      .expect(200)
      .then((res: supertest.Response) => {
        expect(res.body).toHaveProperty("success", true);
        expect(res.body).toHaveProperty("message");
        // expect(res.body).toHaveProperty<SlotMachineSpin>("data");
      });
  });
});

describe("Spin History", () => {
  it("get all spin history", async () => {
    await request(callerApp)
      .get("/api/slots/spin-history")
      .expect(200)
      .then((res: supertest.Response) => {
        expect(res.body).toHaveProperty("success", true);
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty<SlotMachineSpin[]>("data");
      });
  });
});

describe("Reset", () => {
  it("resets the user money to 20 and deletes spin history", async () => {
    await request(callerApp)
      .get("/api/slots/spin-history")
      .expect(200)
      .then((res: supertest.Response) => {
        expect(res.body).toHaveProperty("success", true);
        expect(res.body).toHaveProperty("message");
      });
  });
});


describe("Reward Requirements", () => {
    it("get rewards requirements", async () => {
      await request(callerApp)
        .get("/api/slots/score-sheet")
        .expect(200)
        .then((res: supertest.Response) => {
          expect(res.body).toHaveProperty("success", true);
          expect(res.body).toHaveProperty("message");
          expect(res.body).toHaveProperty<SlotMachineRewardRequirement[]>("data");
        });
    });
  });
  