import React from "react";
import { Table, Card, Container } from "react-bootstrap";
import "./CountryList.css";
import {Country, GetCountriesResponse} from "../../models/Country";
import CountryItem from "../CountryItem/CountryItem";
import FilterName from "../FilterName/FilterName";

const CountryList = () => {
  const [filterState, setFilterState] = React.useState({
    name: "",
    isExactNameMatch: false,
  });

  const[countries, setCountries] = React.useState<Country[] | null>(null);

  const retrieveCountries = () => {

    let urlQueryParams = [];

    if(filterState.isExactNameMatch){
      urlQueryParams.push('isExactNameMatch=true');
    }

    if(filterState.name){
      urlQueryParams.push(`countryNames=${filterState.name}`);
    }

    fetch(`api/countries?${urlQueryParams.map((query,index) => index > 0 ? `&${query}` : query).join('')}`)
      .then((res) => res.json())
      .then((response : GetCountriesResponse) => {
        setCountries(response.countries);
      });
  };

  React.useEffect(() => {
    retrieveCountries();
  }, [filterState]);

  const onFilterNameChange = (newName: string) => {
    setFilterState({ ...filterState, name: newName });
  };

  const onFilterExactMatchChange = (value: boolean) => {
    setFilterState({ ...filterState, isExactNameMatch: value });
  };

  return (
    <Container className="mt-2">
      <Card>
        <Card.Body>
          <Card.Title>Country List</Card.Title>
          <FilterName
            onFilterNameChanged={onFilterNameChange}
            onFilterExactMatch={onFilterExactMatchChange}
          />
          <Table bordered>
            <thead>
              <tr>
                <th>Flag</th>
                <th>Name</th>
                <th>Covid-19 Active Cases</th>
              </tr>
            </thead>
            <tbody>
              {countries?.map((country) => {
                return <CountryItem key={country.name} country={country} />;
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CountryList;
