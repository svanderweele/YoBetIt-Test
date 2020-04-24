
import React from 'react';
import CountryItem from './CountryItem'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'


class CountryList extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            filter: {
                exactMatch: false,
                filterName: "Malta, Swe",
            }
        };

        this.onFilterNameChange = this.onFilterNameChange.bind(this);
        this.onFilterExactMatchChange = this.onFilterExactMatchChange.bind(this);
        this.refreshList = this.refreshList.bind(this);
    }

    componentDidMount() {
        this.refreshList();
    }

    onFilterNameChange(event) {
        this.setState({ filter: { ...this.state.filter, filterName: event.target.value } }, this.refreshList);
        this.refreshList();
    }

    onFilterExactMatchChange(event) {
        this.setState({ filter: { ...this.state.filter, exactMatch: event.target.checked } }, this.refreshList);
    }

    refreshList() {

        let url = 'http://localhost:5000/api/countries?';

        if (this.state.filter.filterName) {
            url += `country_names=${this.state.filter.filterName}`;
            console.log(url)
        }

        if (this.state.filter.exactMatch) {
            url += `&exactMatch=${this.state.filter.exactMatch}`;
        }

        axios.get(`${url}&fields=name;flag;`, { method: 'GET' })
            .then((res) => {
                this.setState({ countries: res.data.data.countries });
            })
            .catch((error) => {
                console.log(error);
            });

    }


    render() {

        return (
            <div className="container">
                <h1>Country List</h1>
                {/* Filter */}
                <InputGroup className="my-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Filter by Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        onChange={this.onFilterNameChange}
                        value={this.state.filter.filterName}
                        placeholder="Malta,Sweden"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />

                </InputGroup>

                <Form.Group controlId="exactMatchCheckbox">
                    <Form.Check type="checkbox" label="Exact Match?" value={this.state.filter.exactMatch} onChange={this.onFilterExactMatchChange} />
                </Form.Group>



                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Country Name</th>
                            <th>Country Flag</th>
                            <th>Active Covid Cases</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.countries.map(country => {
                            return <CountryItem key={country.id} country={country} />
                        })}
                    </tbody>
                </Table>
            </div>
        );

    }
}

export default CountryList;