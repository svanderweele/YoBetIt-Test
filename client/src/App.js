import React from 'react';
import './App.css';
import CountryList from './components/CountryList';

class App extends React.Component {
  state =
    {
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

  render() {
    return (
      <div className="App">
        <CountryList countries={this.state.countries} />
      </div>
    );
  }
}

export default App;
