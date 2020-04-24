
import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button'
import SlotMachineItem from './SlotMachineItem';


class SlotMachine extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            totalSpins: 0,
            spinHistory: [
                {
                    results: ['cherry', 'banana', 'apple']
                },
                {
                    results: ['apple', 'cherry', 'apple']
                },
            ]
        };
    }

    componentDidMount() {
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
                            </tr>
                            <tbody>
                                <tr>
                                    <td>Test</td>
                                </tr>
                            </tbody>
                        </thead>
                    </Table>
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
                    <p>Total Spins {this.state.totalSpins}</p>
                </div>
            </div>
        );

    }
}

export default SlotMachine;