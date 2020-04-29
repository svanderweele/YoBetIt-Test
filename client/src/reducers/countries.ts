import { Country, GetAllCountriesQuery } from "../models/Country";
import { CountryActionTypes, GET_COUNTRIES } from "../types/actions";

const countriesDefaultState: Country[] = [];

export const countryReducer = (
  state = countriesDefaultState,
  action: CountryActionTypes
): Country[] => {
  switch (action.type) {
    case GET_COUNTRIES: {
      return action.payload;
    }

    default:
      return state;
  }
};
