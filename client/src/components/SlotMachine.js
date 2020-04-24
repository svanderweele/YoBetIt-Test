
import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button'
import SlotMachineItem from './SlotMachineItem';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import toastr from 'toastr';


class SlotMachine extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            totalSpins: 0,
            coins: 20,
            showScoreSheet: false,
            scoreScheme: [],
            spinHistory: [],
        };

        this.toggleScoreSheet = this.toggleScoreSheet.bind(this);
        this.loadScoreSheet = this.loadScoreSheet.bind(this);
        this.loadHistory = this.loadHistory.bind(this);
        this.roll = this.roll.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        this.loadHistory();
        this.loadScoreSheet();
    }

    loadScoreSheet() {
        axios.get('http://localhost:5000/api/slots/score-scheme', { method: 'GET' })
            .then(response => {
                this.setState({ scoreScheme: response.data.data });
            })
            .catch(error => console.log(error));
    }


    loadHistory() {
        axios.get('http://localhost:5000/api/slots/history', { method: 'GET' })
            .then(response => {
                this.setState({ spinHistory: response.data.data.history, coins: response.data.data.playerCoins });
            })
            .catch(error => console.log(error));
    }


    roll() {
        axios.get('http://localhost:5000/api/slots/roll', { method: 'GET' })
            .then(response => {
                if (response.data.success) {
                    this.setState({ coins: response.data.data.playerCoins });
                    this.loadHistory();
                    toastr.error(`Spent ${1} to spin!`);
                    if (response.data.data.reward != 0) {
                        toastr.success(`Won ${response.data.data.reward}!`);
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Spin Failed!',
                        text: response.data.data.error,
                        timer: '3000'
                    });
                }
            })
            .catch(error => console.log(error));
    }

    reset() {
        Swal.fire({
            title: 'Reset Slot Machine?',
            text: 'This will reset coins and spin history.',
            showCancelButton: true,
        }).then(result => {
            if (result.value) {
                axios.get('http://localhost:5000/api/slots/reset', { method: 'GET' })
                    .then(response => {
                        this.loadHistory();
                        toastr.info('Reset Slot Machine')
                    })
                    .catch(error => console.log(error));
            }
        });

    }


    toggleScoreSheet() {
        this.setState({ showScoreSheet: !this.state.showScoreSheet })
    }

    render() {

        return (
            <div>
                <div className="container">
                    <h1>Slot Machine</h1>
                    <Button variant="primary" className="mb-1" block onClick={this.roll}>Spin</Button>
                    <Button variant="info" className="mb-1" block onClick={this.toggleScoreSheet}>Show Score Sheet</Button>
                    <Button variant="danger" className="mb-1" block onClick={this.reset}>Reset Slot Machine</Button>
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
                                return <SlotMachineItem key={spin._id} spin={spin} />
                            })}
                        </tbody>
                    </Table>
                    <Collapse in={this.state.showScoreSheet}>
                        <div className="mt-2">
                            <h3>Score Sheet</h3>
                            <Table striped bordered hover >
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Count</th>
                                        <th>Reward</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.scoreScheme.map(score => {
                                        return (
                                            <tr>
                                                <td>{score.type}</td>
                                                <td>x{score.count}</td>
                                                <td>{score.reward}</td>
                                            </tr>);
                                    })}
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