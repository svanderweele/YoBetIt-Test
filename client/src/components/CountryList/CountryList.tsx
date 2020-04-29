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

  const getCountries = () => {
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
