import ServerResponse from "../../../client/src/models/ServerResponse";
import { Country } from "../../../client/src/models/Country";

import request from "supertest";
import app from "../server";
import supertest from "supertest";

const callerApp = app.app;

describe("Get Country (Exact Match)", () => {
  const countryName = "Mexico";
  it("it should get a country", async () => {
    await request(callerApp)
      .get("/api/countries")
      .query({
        country_names: countryName,
        exactMatch: true,
        fields: "name,flag",
      })
      .expect(200)
      .then((res: supertest.Response) => {
        expect(res.body).toHaveProperty<Country[]>("data.countries");
        expect(res.body).toHaveProperty("success", true);
        expect(res.body).toHaveProperty("message");
      });
  });
});

describe("Get Country Matches", () => {
  const countryNames = "Malta,Swe";
  it("it should get a country", async () => {
    await request(callerApp)
      .get("/api/countries")
      .query({
        countryNames: countryNames,
        isExactNameMatch: false,
        fields: "name,flag",
      })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("success", true);
        expect(res.body).toHaveProperty("message");
        expect(res.body.data).toStrictEqual({
          countries: [
            {
              flag: "https://restcountries.eu/data/mlt.svg",
              name: "Malta",
              id: 0,
            },
            {
              flag: "https://restcountries.eu/data/swe.svg",
              name: "Sweden",
              id: 1,
            },
          ],
        });
      });
  });
});

describe("Get All Countries", () => {
  it("should retrieve a list of countries", async () => {
    await request(callerApp)
      .get("/api/countries")
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty<Country[]>("data.countries");
        expect(res.body).toHaveProperty("success", true);
        expect(res.body).toHaveProperty("message");
      });
  });
});

describe("Get Countries (not exact match)", () => {
  const countryName = "C";
  it("it should get a country", async () => {
    await request(callerApp)
      .get("/api/countries")
      .query({
        country_names: countryName,
        exactMatch: false,
        fields: "name,flag",
      })
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("success", true);
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty<Country[]>("data.countries");
      });
  });
});
