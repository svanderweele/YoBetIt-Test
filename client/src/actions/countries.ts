import { GetAllCountriesQuery, Country } from "../models/Country";
import { GET_COUNTRIES, AppActions } from "../types/actions";
import { Dispatch } from "react";
import { AppState } from "../store/configureStore";
import ServerResponse from "../models/ServerResponse";

export const getCountries = (countries: Country[]): AppActions => ({
  type: GET_COUNTRIES,
  payload: countries,
});

export const startGetCountries = (query: GetAllCountriesQuery) => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    retrieveCountries(query).then((countries: Country[]) => {
      dispatch(getCountries(countries));
    });
  };
};

const retrieveCountries = (query: GetAllCountriesQuery): Promise<Country[]> => {
  return new Promise<Country[]>((resolve, reject) => {
    try {
      let queries: string[] = [];

      if (query.countryNames != undefined) {
        queries.push(`countryNames=${query.countryNames}`);
      }

      if (query.isExactNameMatch == "true") {
        queries.push(`isExactNameMatch=true`);
      }

      const urlQuery = queries
        .map((query: string, index: number) =>
          index == 0 ? `${query}` : `&${query}`
        )
        .join("");

      fetch(`https://stark-sea-70808.herokuapp.com/api/countries?${urlQuery}`)
        .then((res) => res.json())
        .then((response: ServerResponse) => {
          let countries = response.data.countries as Country[];
          resolve(countries);
        });
    } catch (error) {
      reject(error);
    }
  });
};
