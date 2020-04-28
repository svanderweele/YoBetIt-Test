import React from "react";
import { Country } from "../../models/Country";
import numeral from 'numeral';

interface CountryListItemProps {
  country: Country;
}

const CountryListItem = (props: CountryListItemProps) => {
  const tdStyle = {
    verticalAlign: "middle",
  };

  return (
    <tr>
      <td style={tdStyle}>{props.country.id}</td>
      <td style={tdStyle}>{props.country.name}</td>
      <td style={tdStyle}>
        <img className='img-fluid' width='100px' src={props.country.flag} alt="Imagine a flag was here" />
      </td>
      <td style={tdStyle}>{numeral(props.country.activeCoronaCases).format('0,0')}</td>
    </tr>
  );
};

export default CountryListItem;
