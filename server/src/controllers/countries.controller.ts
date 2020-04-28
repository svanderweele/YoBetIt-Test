import express, { Request, Response } from "express";
import ServerResponse from "../../../client/src/models/ServerResponse";
import { Country } from "../../../client/src/models/Country";
import axios from 'axios';
import { logger } from "../../src/utilities/winston";

/**
 * @swagger
 * /api/countries:
 *   get:
 *     tags: ['Countries']
 *     description: Get Countries
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: country_names
 *         description: The names of the country to search for.
 *         in: query
 *         required: false
 *         type: string
 *         default: Malta, Swe
 *       - name: exactMatch
 *         description: Should it try to match part of the country name?
 *         in: query
 *         required: false
 *         type: boolean
 *         default: true
 *       - name: fields
 *         description: Fields used for filtering result from REST Countries api
 *         in: query
 *         required: false
 *         type: string
 *         default: name,flag
 *     responses:
 *       200:
 *         description: A successful response.
 *         schema:
 *           $ref: '#/components/schemas/Response'
 */

interface GetAllCountriesQuery{
  countryNames?:string;
  fields?:string;
  isExactNameMatch?:string;
}


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
    // Filtering
    let queryFields = "?";
    
    let query : GetAllCountriesQuery = <GetAllCountriesQuery>(<any>request.query);

    if (query.fields) {
      const fields = query.fields.split(",");
      if (fields.length > 0) {
        queryFields += "fields=";
        fields.forEach((field) => {
          queryFields += `${field};`;
        });
      }
    }

    function MapIdToCountries(countries: Country[]) {
      let count = 0;
      countries.map((country) => {
        country.id = count++;
        return country;
      });
    }

    // Get All
    if (query.countryNames === undefined) {
      await axios.get(`https://restcountries.eu/rest/v2/all${queryFields}`)
        .then((res) => {
          MapIdToCountries(res.data);
          response.send(
            new ServerResponse(true, "Countries received", {
              countries: res.data,
            })
          );
        })
        .catch((error) => {
          throw error;
        });
    }

    // Get by full name
    if (query.countryNames !== undefined) {
      const queryCountryNames = query.countryNames
        .split(",")
        .map((countryName) => countryName.trim())
        .filter((e) => e !== "");

      const url = `https://restcountries.eu/rest/v2${queryFields}}`;
      await axios.get(url)
        .then((res) => {
          const countries = this.filterCountriesByName(
            res.data,
            queryCountryNames,
            query.isExactNameMatch === 'true'
          );
          MapIdToCountries(countries);
          response.send(
            new ServerResponse(true, "Countries found", { countries })
          );
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            response.status(404);
            response.send(
              new ServerResponse(false, "Country with that name not found.", {
                error: err.message,
              })
            );
          }
          response.send(
            new ServerResponse(false, "Internal error occured", {
              error: err.message,
              url,
            })
          );
        });
    }
  };

  filterCountriesByName = (
    countries: Country[],
    filterNames: string[],
    exactMatch: boolean
  ): Country[] => {
    const validCountries: Country[] = [];

    countries.forEach((country) => {
      filterNames.forEach((queryName) => {
        if (exactMatch === true) {
          if (country.name === queryName) {
            validCountries.push(country);
          }
        } else {
          if (country.name.indexOf(queryName) > -1) {
            validCountries.push(country);
          }
        }
      });
    });
    return validCountries;
  };
}

export default CountriesController;
