import express, { Request, Response } from "express";
import ServerResponse from "../models/ServerResponse";
import { Country, GetAllCountriesQuery } from "../models/Country";
import { logger } from "../utilities/winston";
import countryService from "./countries.service";



class CountriesController {
  public path = "/api/countries";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllCountries);
  }

  getAllCountries = async (request: Request, response: Response) => {
    const query: GetAllCountriesQuery = (
      (request.query as any)
    ) as GetAllCountriesQuery;
    countryService
      .getAllCountries(query)
      .then((countries: Country[]) => {
        response.send(new ServerResponse(true, "Got countries", { countries }));
      })
      .catch((error) => {
        response.send(new ServerResponse(false, "Error occurred", { error }));
      });
    }
  };

export default CountriesController;
