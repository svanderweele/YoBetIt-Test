import React from 'react';
import numeral from 'numeral';
import axios from 'axios';

class CountryItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = { numberOfCases: 0 };
    this.updateCases = this.updateCases.bind(this);
  }

  componentDidMount() {
    this.updateCases();
}



  updateCases() {
    let formattedName = this.props.country.name.trim();
    axios.get(`https://api.covid19api.com/live/country/${formattedName}`, { method: 'GET' })
      .then((res) => {
        this.setState({ numberOfCases: res.data[res.data.length-1].Active });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const tdStyle = {
      verticalAlign: 'middle'
    }

    return (
      <tr>
        <td style={tdStyle}>{this.props.country.id}</td>
        <td style={tdStyle}>{this.props.country.name}</td>
        <td style={tdStyle}><img className="img-fluid" width="100px" src={this.props.country.flag}alt="Imagine a flag is here!"></img></td>
        <td style={tdStyle}>{numeral(this.state.numberOfCases).format('0,0')}</td>
      </tr>
    );
  }
}

export default CountryItem;