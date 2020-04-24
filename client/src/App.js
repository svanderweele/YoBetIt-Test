import React from 'react';
import './App.css';
import CountryList from './components/CountryList';
import SlotMachine from './components/SlotMachine';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import Fade from 'react-bootstrap/Fade';
import Jumbotron from 'react-bootstrap/Jumbotron';

class App extends React.Component {


  constructor(props) {
    super(props);
    this.state =
    {
      isCountryListShown: false,
      countries: [
        {
          id: 0,
          name: 'Malta',
          numberOfCases: 300,
        },
        {
          id: 1,
          name: 'Japan',
          numberOfCases: 512031231,
        }
      ]
    };
    this.toggleCountryList = this.toggleCountryList.bind(this);
  }

  toggleCountryList() {
    this.setState({ isCountryListShown: !this.state.isCountryListShown });
  }

  render() {
    return (
      <div className="App">
        <Jumbotron className="m-5">

          <Button variant="primary" className="mb-1" onClick={this.toggleCountryList}>{this.state.isCountryListShown == false ? 'Country List' : 'Slot Machine'}</Button>
          <Collapse in={this.state.isCountryListShown}>
            <div>
              <CountryList countries={this.state.countries} />
            </div>
          </Collapse>
          <Fade in={!this.state.isCountryListShown}>
            <div>
              <SlotMachine />
            </div>
          </Fade>
        </Jumbotron>

      </div>
    );
  }
}

export default App;
