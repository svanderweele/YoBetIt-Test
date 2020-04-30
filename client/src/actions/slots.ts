import { GetAllCountriesQuery, Country } from "../models/Country";
import {
  SPIN_SLOTS,
  AppActions,
  GET_SPIN_HISTORY,
  GET_USER,
  RESET_SLOTS,
  GET_REWARD_REQUIREMENTS,
} from "../types/actions";
import { Dispatch } from "react";
import { AppState } from "../store/configureStore";
import ServerResponse from "../models/ServerResponse";
import { SlotMachineSpin, SlotMachineRewardRequirement } from "../models/SlotMachine";
import { User } from "../models/User";

export const spinSlots = (spin: SlotMachineSpin): AppActions => ({
  type: SPIN_SLOTS,
  payload: spin,
});

export const startSpin = () => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    fetch(`https://stark-sea-70808.herokuapp.com/api/slots/roll`)
      .then((res) => res.json())
      .then((res: ServerResponse) => {
        if (res.success) {
          let spin: SlotMachineSpin = res.data;
          if (spin.reward > 0) {
            dispatch(spinSlots(spin));
          }
        }
      });
  };
};

export const getSpinHistory = (spinHistory: SlotMachineSpin[]): AppActions => ({
  type: GET_SPIN_HISTORY,
  payload: spinHistory,
});

export const startGetSpinHistory = () => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    fetch(`https://stark-sea-70808.herokuapp.com/api/slots/spin-history`)
      .then((res) => res.json())
      .then((res: ServerResponse) => {
        dispatch(getSpinHistory(res.data));
      });
  };
};

export const getRewardRequirements = (rewardRequirements: SlotMachineRewardRequirement[]): AppActions => ({
  type: GET_REWARD_REQUIREMENTS,
  payload: rewardRequirements,
});

export const startGetRewardRequirements = () => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    fetch(`https://stark-sea-70808.herokuapp.com/api/slots/score-sheet`)
      .then((res) => res.json())
      .then((res: ServerResponse) => {
        dispatch(getRewardRequirements(res.data));
      });
  };
};

export const getUser = (user: User): AppActions => ({
  type: GET_USER,
  payload: user,
});

export const startGetUser = () => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    fetch(`https://stark-sea-70808.herokuapp.com/api/users/`)
      .then((res) => res.json())
      .then((res: ServerResponse) => {
        getUser(res.data[0]);
      });
  };
};

export const resetSlots = (): AppActions => ({
  type: RESET_SLOTS,
});

export const startResetSlots = () => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    fetch(`https://stark-sea-70808.herokuapp.com/api/slots/reset`)
      .then((res) => res.json())
      .then((res: ServerResponse) => {
        if (res.success == false) {
          console.log("Failed to reset slots " + res.data);
        }
      });
  };
};
