import React from "react";
import { shallow } from "enzyme";
import SlotMachineScoreSheet from "./SlotMachineScoreSheet";
import {
  SlotMachineRewardRequirement,
  SlotMachinePatternTypeEnum,
} from "../../models/SlotMachine";
describe("Slot Machine Score Sheet", () => {
  it("should render correctly", () => {
    const requirements = [
      new SlotMachineRewardRequirement(
        [
          SlotMachinePatternTypeEnum.Apple,
          SlotMachinePatternTypeEnum.Apple,
          SlotMachinePatternTypeEnum.Apple,
        ],
        20
      ),
    ];

    requirements.forEach((requirements, index) => (requirements.id = index));

    const component = shallow(
      <SlotMachineScoreSheet rewardRequirements={requirements} />
    );
    expect(component).toMatchSnapshot();
  });
});
