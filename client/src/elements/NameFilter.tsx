import React, { Props, SetStateAction, ChangeEvent, FormEvent } from "react";
import { InputGroup, FormControl } from "react-bootstrap";

interface IProps {
    onFilterChanged: (name : string) => void;
  }

const NameFilter = (props : IProps) => {

  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>Username</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl placeholder="Username" aria-label="Username" onChange={(e:React.ChangeEvent<HTMLInputElement>) => props.onFilterChanged(e.target.value)}/>
    </InputGroup>
  );
};


export default NameFilter;