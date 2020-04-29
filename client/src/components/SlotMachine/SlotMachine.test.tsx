import React from "react";
import { shallow } from "enzyme";
import SlotMachine from "./SlotMachine";
describe("SlotMachine", () => {
  it('should render correctly', () => {
    const component = shallow(<SlotMachine />);
    expect(component).toMatchSnapshot();
  });
});
