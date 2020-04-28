import React from "react";
import { Table, Card } from "react-bootstrap";
import { SlotMachineSpin } from "../../models/SlotMachine";
import moment from 'moment';

interface SlotMachineHistoryProps {
  spins: SlotMachineSpin[];
}

const SlotMachineHistory = (props: SlotMachineHistoryProps) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Slot Machine History</Card.Title>
        <Table bordered>
          <thead>
            <tr>
              <th>Result</th>
              <th>Reward</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {props.spins.map((spin: SlotMachineSpin) => {
              return (
                <tr key={spin.id}>
                  <td>{spin.result}</td>
                  <td>{spin.reward}</td>
                  <td>{moment(spin.date).format('MMMM Do YYYY, h:mm:ss a')}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default SlotMachineHistory;
