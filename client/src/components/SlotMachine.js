
import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button'
import SlotMachineItem from './SlotMachineItem';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';


class SlotMachine extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            totalSpins: 0,
            coins: 20,
            showScoreSheet: false,
            spinHistory: [
                {
                    results: ['cherry', 'banana', 'apple']
                },
                {
                    results: ['apple', 'cherry', 'apple']
                },
            ]
        };

        this.toggleScoreSheet = this.toggleScoreSheet.bind(this);
    }

    componentDidMount() {
    }

    toggleScoreSheet() {
        this.setState({ showScoreSheet: !this.state.showScoreSheet })
    }

    render() {

        return (
            <div>
                <div className="container">
                    <h1>Slot Machine</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Current Coins</th>
                                <th>Total Spins</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.coins}</td>
                                <td>{this.state.totalSpins}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <h3>History</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Result</th>
                                <th>Reward</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.spinHistory.map(spin => {
                                return <SlotMachineItem spin={spin} />
                            })}
                        </tbody>
                    </Table>
                    <Button variant="primary" className="mb-1" block>Spin</Button>
                    <Button variant="info" className="mb-1" block onClick={this.toggleScoreSheet}>Show Score Sheet</Button>
                    {/* <Card>
                        <Card>
                            <Card.Header>Coins {this.state.coins}</Card.Header>
                            <Card.Body>Total Spins {this.state.totalSpins}</Card.Body>
                        </Card>
                    </Card> */}
                    <Collapse in={this.state.showScoreSheet}>
                        <div className="mt-2">
                            <h3>Score Sheet</h3>
                            <Table striped bordered hover >
                                <thead>
                                    <tr>
                                        <th>Pattern</th>
                                        <th>Reward</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2x apple</td>
                                        <td>10</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                    </Collapse>

                </div>
            </div>
        );

    }
}

export default SlotMachine;