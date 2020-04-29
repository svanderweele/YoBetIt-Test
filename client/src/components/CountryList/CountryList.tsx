import React from "react";
import { Card, Table } from "react-bootstrap";
import { Country, GetAllCountriesQuery } from "../../models/Country";
import CountryListFilter from "./CountryListFilter";
import CountryListItem from "./CountryListItem";
import ServerResponse from "../../models/ServerResponse";
import { connect } from "react-redux";
import { AppState } from "../../store/configureStore";

import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../types/actions";
import { bindActionCreators } from "redux";
import { startGetCountries } from "../../actions/countries";

interface FilterState {
  filterName?: string;
  isExactNameMatch: boolean;
}

interface CountryListProps {
  countries: Country[];
}

type Props = CountryListProps & LinkStateProps & LinkDispatchProps;

const CountryList = (props: Props) => {
  // const [countries, setCountries] = React.useState<Country[] | null>(null);
  const [filterState, setFilterState] = React.useState<FilterState>({
    filterName: undefined,
    isExactNameMatch: false,
  });

  React.useEffect(() => {
    // setCountries([
    //   new Country(1, "https://restcountries.eu/data/mlt.svg", "Malta", 523),
    //   new Country(
    //     2,
    //     "https://restcountries.eu/data/swe.svg",
    //     "Scotland",
    //     23512
    //   ),
    // ]);
  }, []);

  const getCountries = () => {
    // let queries: string[] = [];
    // if (filterState.filterName != undefined) {
    //   queries.push(`countryNames=${filterState.filterName}`);
    // }
    // if (filterState.isExactNameMatch == true) {
    //   queries.push(`isExactNameMatch=true`);
    // }
    // const query = queries
    //   .map((query: string, index: number) =>
    //     index == 0 ? `${query}` : `&${query}`
    //   )
    //   .join("");
    // fetch(`${process.env.REACT_APP_HOST}/api/countries?${query}`)
    //   .then((res) => res.json())
    //   .then((response: ServerResponse) => {
    //     let countries = response.data.countries as Country[];
    //     setCountries(countries);
    //   });

    props.startGetCountries({
      countryNames: filterState.filterName,
      isExactNameMatch: filterState.isExactNameMatch.toString(),
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
            {props.countries?.map((country: Country) => {
              return <CountryListItem key={country.id} country={country} />;
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

interface LinkStateProps {
  countries: Country[];
}

interface LinkDispatchProps {
  startGetCountries: (query: GetAllCountriesQuery) => void;
}

const mapStateToProps = (state: AppState, props: any): LinkStateProps => ({
  countries: state.countries,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  props: any
): LinkDispatchProps => ({
  startGetCountries: bindActionCreators(startGetCountries, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryList);
