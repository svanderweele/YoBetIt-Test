import Database from "../../src/database";
import { logger } from "../../src/utilities/winston";
import ServerResponse from "../../../client/src/models/ServerResponse";
import { Country } from "../../../client/src/models/Country";
import { GetAllCountriesQuery } from "./countries.controller";
import axios from "axios";

class CountryService {
  static getAllCountries = (
    query: GetAllCountriesQuery
  ): Promise<Country[]> => {
    return new Promise<Country[]>((resolve, reject) => {
      try {
        // Filtering
        let queryFields = "?";

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
          axios
            .get(`https://restcountries.eu/rest/v2/all${queryFields}`)
            .then((res) => {
              MapIdToCountries(res.data);
              resolve(res.data);
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
          axios
            .get(url)
            .then((res) => {
              const countries = CountryService.filterCountriesByName(
                res.data,
                queryCountryNames,
                query.isExactNameMatch === "true"
              );
              MapIdToCountries(countries);
              resolve(countries);
            })
            .catch((err) => {
              if (err.response && err.response.status === 404) {
                resolve([]);
              }
              reject("Internal error occurred");
              logger.error(err.message);
            });
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  static filterCountriesByName = (
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

export default CountryService;
