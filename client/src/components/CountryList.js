
import React from 'react';
import CountryItem from './CountryItem'

class CountryList extends React.Component {
    state = {};


    render() {
        return this.props.countries.map(country => {
            return <CountryItem country={country}/>
        });
    }
}

export default CountryList;