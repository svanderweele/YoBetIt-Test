import React from "react";
import { Card, Table, ButtonGroup, Button, Collapse } from "react-bootstrap";
import SlotMachineHistory from "./SlotMachineHistory";
import {
  SlotMachineSpin,
  SlotMachineRewardRequirement,
  SlotMachinePatternTypeEnum,
} from "../../models/SlotMachine";
import SlotMachineScoreSheet from "./SlotMachineScoreSheet";
import { User } from "../../models/User";
import toastr from "toastr";
import Swal, { SweetAlertResult } from "sweetalert2";

const SlotMachine = () => {
  const [spinHistory, setSpinHistory] = React.useState<SlotMachineSpin[]>([
    new SlotMachineSpin(1, new Date(), "apple apple banana", 1, 20),
    new SlotMachineSpin(2, new Date(), "cherry cherry cherry", 1, 50),
  ]);

  const [isScoreSheetShown, setScoreSheetShown] = React.useState(false);
  const [userData, setUserData] = React.useState<User>({
    id: 0,
    name: "Simon van der Weele",
    money: 20,
  });

  const [rewardRequirements, setRewardRequirements] = React.useState<
    SlotMachineRewardRequirement[]
  >([
    new SlotMachineRewardRequirement(
      0,
      [SlotMachinePatternTypeEnum.Apple, SlotMachinePatternTypeEnum.Apple],
      20
    ),
    new SlotMachineRewardRequirement(
      1,
      [SlotMachinePatternTypeEnum.Cherry, SlotMachinePatternTypeEnum.Cherry],
      50
    ),
  ]);

  const spin = () => {
    if (userData.money <= 0) {
      toastr.warning("You are out of money! Consider resetting.");
    }
    toastr.info("Spinning...");
  };

  const reset = () => {
    Swal.fire({
      title: "Are you sure you want to reset?",
      text: "This will reset your history and money.",
      showCancelButton: true,
      background: 'danger'
    }).then((result: SweetAlertResult) => {
      if (result.value) {
        toastr.success("Reset successful", "Successfully reset slots!");
      }
    });
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Slot Machine</Card.Title>
        <ButtonGroup aria-label="Basic example" className="mb-2">
          <Button variant="primary" onClick={spin}>
            Spin
          </Button>
          <Button
            variant="secondary"
            onClick={() => setScoreSheetShown(!isScoreSheetShown)}
            aria-controls="example-collapse-text"
            aria-expanded={isScoreSheetShown}
          >
            Show Score Sheet
          </Button>
          <Button variant="danger" onClick={reset}>
            Reset
          </Button>
        </ButtonGroup>
        <div>
          <h3>Current Money: {userData.money}</h3>
        </div>
        <SlotMachineHistory spins={spinHistory} />
        <hr />
        <Collapse in={isScoreSheetShown}>
          <div>
            <SlotMachineScoreSheet rewardRequirements={rewardRequirements} />
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
};

export default SlotMachine;
