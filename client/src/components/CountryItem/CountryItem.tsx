import React from "react";
import {Country} from '../../models/Country';

interface CountryItemProps {
  country : Country
}


const CountryItem = (props: CountryItemProps) => {

const trStyle = {
  verticalAlign: 'middle'
}

  return (
    <tr>
      <td style={trStyle}>
        <img
          className="country-flag img-fluid"
          src={props.country.flag}
          alt="Flag"
        />
      </td>
      <td style={trStyle}>{props.country.name}</td>
      <td style={trStyle}>{props.country.activeCoronaCases}</td>
    </tr>
  );
};

export default CountryItem;
