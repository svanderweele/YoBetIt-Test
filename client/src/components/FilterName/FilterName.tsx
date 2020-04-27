import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

interface FilterNameProps {
  onFilterNameChanged: (newName: string) => void;
  onFilterExactMatch: (newBool: boolean) => void;
}

const FilterName = (props: FilterNameProps) => {
  return (
    <InputGroup className="mb-2">
      <InputGroup.Prepend>
        <InputGroup.Text id="country-name">
          Country Name
        </InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder="Malta, Sweden"
        aria-label="Country Name"
        aria-describedby="country-name"
        onChange={(e) => props.onFilterNameChanged(e.target.value)}
      />
      <InputGroup.Append>
      <InputGroup.Text id="country-name">
          Exact match?
        </InputGroup.Text>
        <InputGroup.Checkbox aria-label="exact-match-country-name" onChange = {(e) => props.onFilterExactMatch(e.target.checked)}/>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default FilterName;
