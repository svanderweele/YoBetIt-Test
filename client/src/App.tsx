import React from "react";
import CountryList from "./components/CountryList/CountryList";
import { Tabs, Tab } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Tabs defaultActiveKey="countries" id="uncontrolled-tab-example">
        <Tab eventKey="countries" title="Countries">
          <CountryList />
        </Tab>
        <Tab eventKey="slots" title="Slot Machine">
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
