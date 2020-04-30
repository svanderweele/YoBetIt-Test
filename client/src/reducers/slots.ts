import { Country, GetAllCountriesQuery } from "../models/Country";
import {
  SlotActionTypes,
  SPIN_SLOTS,
  GET_USER,
  GET_SPIN_HISTORY,
  GetUserAction,
  GetSpinHistoryAction,
  SpinSlotsAction,
  GET_REWARD_REQUIREMENTS,
  GetRewardRequirementsAction,
} from "../types/actions";
import {
  SlotMachineSpin,
  SlotMachineRewardRequirement,
} from "../models/SlotMachine";
import { User } from "../models/User";

export interface SlotsState {
  rewardRequirements: SlotMachineRewardRequirement[];
  spinHistory: SlotMachineSpin[];
  user?: User;
  lastSpin?: SlotMachineSpin;
}

const defaultState: SlotsState = {
  spinHistory: [],
  rewardRequirements: [],
  user: undefined,
  lastSpin: undefined,
};

export const slotReducer = (
  state = defaultState,
  action: SlotActionTypes
): SlotsState => {
  switch (action.type) {
    case SPIN_SLOTS: {
      let myAction = <SpinSlotsAction>action;
      state.lastSpin = myAction.payload;
    }
    case GET_USER: {
      let myAction = <GetUserAction>action;
      state.user = myAction.payload;
    }

    case GET_SPIN_HISTORY: {
      let myAction = <GetSpinHistoryAction>action;
      state.spinHistory = myAction.payload;
    }
    case GET_REWARD_REQUIREMENTS: {
      let myAction = <GetRewardRequirementsAction>action;
      state.rewardRequirements = myAction.payload;
    }

    default:
      return state;
  }
};
