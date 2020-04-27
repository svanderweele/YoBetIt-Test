import { Server } from "miragejs";
import { Country, GetCountriesResponse } from "../models/Country";

new Server({
  routes() {
    this.namespace = "/api";

    this.get("/countries", (schema, request) => {
      const isExactNameMatch = request.queryParams.isExactNameMatch;
      const countryNames = request.queryParams.countryNames;

      let countries = [];

      if (countryNames != null) {
        if (isExactNameMatch) {
          if (countryNames.toLowerCase().indexOf("malta") > -1) {
            countries = [
              new Country(
                "https://restcountries.eu/data/mlt.svg",
                "Malta",
                432
              ),
            ];
          }
        } else {
          if ("Malta".toLowerCase().indexOf(countryNames.toLowerCase()) > -1) {
            countries = [
              new Country(
                "https://restcountries.eu/data/mlt.svg",
                "Malta",
                432
              ),
            ];
          }
        }
      } else {
        countries = [
          new Country(
            "https://restcountries.eu/data/afg.svg",
            "Afghanistan",
            200
          ),
          new Country(
            "https://restcountries.eu/data/ala.svg",
            "Åland Islands",
            123
          ),
          new Country("https://restcountries.eu/data/mlt.svg", "Malta", 432),
        ];
      }

      return new GetCountriesResponse(true, "Countries retrieved", countries);
    });
  },
});
