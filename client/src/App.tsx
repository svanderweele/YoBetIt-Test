import React from "react";
import CountryList from "./components/CountryList/CountryList";
import { Tabs, Container, Tab } from "react-bootstrap";
import SlotMachine from "./components/SlotMachine/SlotMachine";

function App() {
  return (
    <div className="App">
      <Tabs defaultActiveKey="countryList" id="uncontrolled-tab-example">
        <Tab eventKey="countryList" title="Country List">
          <Container className="mt-2">
            <CountryList />
          </Container>
        </Tab>
        <Tab eventKey="slotMachine" title="Slot Machine">
        <Container className="mt-2">
            <SlotMachine/>
          </Container>
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
