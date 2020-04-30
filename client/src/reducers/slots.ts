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
  RESET_SLOTS,
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
      return {...state, lastSpin: myAction.payload};
    }
    case GET_USER: {
      let myAction = <GetUserAction>action;
      return {...state, user: myAction.payload};
    }

    case GET_SPIN_HISTORY: {
      let myAction = <GetSpinHistoryAction>action;
      return {...state, spinHistory: myAction.payload};
    }
    case GET_REWARD_REQUIREMENTS: {
      let myAction = <GetRewardRequirementsAction>action;
      return {...state, rewardRequirements: myAction.payload};
    }

    case RESET_SLOTS: {
      return {...state, spinHistory: []}
    }

    default:
      return state;
  }
};
