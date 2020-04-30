import { Country } from "../models/Country";
import { SlotMachineSpin, SlotMachineRewardRequirement } from "../models/SlotMachine";
import { User } from "../models/User";

export const GET_COUNTRIES = "GET_COUNTRIES";
export interface GetCountriesAction {
  type: typeof GET_COUNTRIES;
  payload: Country[];
}
export type CountryActionTypes = GetCountriesAction;

export const SPIN_SLOTS = "SPIN_SLOTS";
export interface SpinSlotsAction {
  type: typeof SPIN_SLOTS;
  payload: SlotMachineSpin;
}
export const GET_SPIN_HISTORY = "GET_SPIN_HISTORY";
export interface GetSpinHistoryAction {
  type: typeof GET_SPIN_HISTORY;
  payload: SlotMachineSpin[];
}
export const GET_USER = "GET_USER";
export interface GetUserAction {
  type: typeof GET_USER;
  payload: User;
}
export const RESET_SLOTS = "RESET_SLOTS";
export interface ResetSlotsAction {
  type: typeof RESET_SLOTS;
}

export const GET_REWARD_REQUIREMENTS = "GET_REWARD_REQUIREMENTS";
export interface GetRewardRequirementsAction {
  type: typeof GET_REWARD_REQUIREMENTS,
  payload: SlotMachineRewardRequirement[]
}

export type SlotActionTypes =
  | SpinSlotsAction
  | GetUserAction
  | GetSpinHistoryAction
  | ResetSlotsAction
  | GetRewardRequirementsAction;

export type AppActions = CountryActionTypes | SlotActionTypes;
