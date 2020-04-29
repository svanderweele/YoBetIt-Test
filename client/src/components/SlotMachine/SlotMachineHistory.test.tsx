import React from "react";
import { shallow } from "enzyme";
import SlotMachineHistory from "./SlotMachineHistory";
import { SlotMachineSpin } from "../../models/SlotMachine";
describe("Slot Machine History", () => {
  it("should render correctly", () => {
    const spins = [
      new SlotMachineSpin(new Date(2020, 5, 28, 9, 15, 23), "Apple, Apple, Apple", 1, 20),
    ];

    spins.forEach((spin, index) => (spin.id = index));

    const component = shallow(<SlotMachineHistory spins={spins} />);
    expect(component).toMatchSnapshot();
  });
});
