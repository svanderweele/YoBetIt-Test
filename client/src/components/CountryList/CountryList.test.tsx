import React from "react";
import { shallow } from "enzyme";
import CountryList from "./CountryList";
describe("CountryList", () => {
  it('should render correctly', () => {
    const countryList = shallow(<CountryList />);
    expect(countryList).toMatchSnapshot();
  });
});
