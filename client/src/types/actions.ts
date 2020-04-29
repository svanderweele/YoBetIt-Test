import { Country } from "../models/Country";

export const GET_COUNTRIES = "GET_COUNTRIES";


export interface GetCountriesAction{
    type: typeof GET_COUNTRIES,
    payload: Country[]
}


// export const

export type CountryActionTypes = GetCountriesAction;

export type AppActions = CountryActionTypes;