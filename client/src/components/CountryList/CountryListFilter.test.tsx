import React from "react";
import { shallow } from "enzyme";
import CountryListFilter from "./CountryListFilter";
describe("CountryList", () => {
  it("should render correctly", () => {
    const component = shallow(
      <CountryListFilter
        onFilterExactMatch={(props: any) => {}}
        onFilterNameChanged={(props: any) => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
