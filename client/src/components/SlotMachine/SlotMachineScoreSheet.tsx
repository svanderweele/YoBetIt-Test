import React from "react";
import { Table, Card } from "react-bootstrap";
import {
  SlotMachineRewardRequirement,
} from "../../models/SlotMachine";

interface SlotMachineScoreSheetProps {
  rewardRequirements: SlotMachineRewardRequirement[];
}

const SlotMachineScoreSheet = (props: SlotMachineScoreSheetProps) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Slot Machine Score Sheet</Card.Title>
        <Table bordered>
          <thead>
            <tr>
              <th>Id</th>
              <th>Pattern</th>
              <th>Reward</th>
            </tr>
          </thead>
          <tbody>
            {props.rewardRequirements.map(
              (reward: SlotMachineRewardRequirement) => {
                return (
                  <tr key={reward.id}>
                    <td>{reward.id}</td>
                    <td>{reward.patternString}</td>
                    <td>{reward.reward}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default SlotMachineScoreSheet;
