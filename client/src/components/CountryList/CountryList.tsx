import React from "react";
import { Card, Table } from "react-bootstrap";
import { Country } from "../../models/Country";
import CountryListFilter from "./CountryListFilter";
import CountryListItem from "./CountryListItem";
import MyServerResponse from "../../models/ServerResponse";

interface FilterState {
  filterName?: string;
  isExactNameMatch: boolean;
}

const CountryList = () => {
  const [countries, setCountries] = React.useState<Country[] | null>(null);
  const [filterState, setFilterState] = React.useState<FilterState>({
    filterName: undefined,
    isExactNameMatch: false,
  });

  React.useEffect(() => {
    setCountries([
      new Country(1, "https://restcountries.eu/data/mlt.svg", "Malta", 523),
      new Country(
        2,
        "https://restcountries.eu/data/swe.svg",
        "Scotland",
        23512
      ),
    ]);
  }, []);

  const getCountries = () => {
    let queries: string[] = [];

    if (filterState.filterName != undefined) {
      queries.push(`countryNames=${filterState.filterName}`);
    }

    if (filterState.isExactNameMatch == true) {
      queries.push(`isExactNameMatch=true`);
    }

    const query = queries
      .map((query: string, index: number) =>
        index == 0 ? `${query}` : `&${query}`
      )
      .join("");

    fetch(`${process.env.REACT_APP_HOST}/api/countries?${query}`)
      .then((res) => res.json())
      .then((response: MyServerResponse) => {
        let countries = response.data.countries as Country[];
        setCountries(countries);
      });
  };

  React.useEffect(() => {
    getCountries();
  }, [filterState]);

  const onFilterNameChange = (newName: string) => {
    setFilterState({ ...filterState, filterName: newName });
  };

  const onFilterExactMatchChange = (value: boolean) => {
    setFilterState({ ...filterState, isExactNameMatch: value });
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Country List</Card.Title>
        <CountryListFilter
          onFilterExactMatch={onFilterExactMatchChange}
          onFilterNameChanged={onFilterNameChange}
        />
        <Table bordered>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Flag</th>
              <th>Active Corona Cases</th>
            </tr>
          </thead>
          <tbody>
            {countries?.map((country: Country) => {
              return <CountryListItem key={country.id} country={country} />;
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default CountryList;
