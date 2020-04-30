import React from "react";
import { Card, Table, ButtonGroup, Button, Collapse } from "react-bootstrap";
import SlotMachineHistory from "./SlotMachineHistory";
import {
  SlotMachineSpin,
  SlotMachineRewardRequirement,
} from "../../models/SlotMachine";
import SlotMachineScoreSheet from "./SlotMachineScoreSheet";
import { User } from "../../models/User";
import toastr from "toastr";
import Swal, { SweetAlertResult } from "sweetalert2";
import ServerResponse from "../../models/ServerResponse";

import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../types/actions";
import { bindActionCreators } from "redux";
import { startGetCountries } from "../../actions/countries";
import { AppState } from "../../store/configureStore";
import { SlotsState } from "../../reducers/slots";
import {
  startGetSpinHistory,
  startSpin,
  startResetSlots,
  startGetUser,
  startGetRewardRequirements,
} from "../../actions/slots";
import { connect } from "react-redux";

interface SlotMachineProps {
}
type Props = SlotMachineProps & LinkStateProps & LinkDispatchProps;

const SlotMachine = (props: Props) => {
  const [spinHistory, setSpinHistory] = React.useState<SlotMachineSpin[]>([
    new SlotMachineSpin(
      new Date(2020, 5, 28, 9, 15, 23),
      "apple apple banana",
      1,
      20
    ),
    new SlotMachineSpin(
      new Date(2020, 5, 28, 9, 15, 23),
      "cherry cherry cherry",
      1,
      50
    ),
  ]);

  const [isScoreSheetShown, setScoreSheetShown] = React.useState(false);
  const [userData, setUserData] = React.useState<User>({
    id: 0,
    name: "Simon van der Weele",
    money: 20,
  });

  const [rewardRequirements, setRewardRequirements] = React.useState<
    SlotMachineRewardRequirement[]
  >([]);

  const spin = () => {
    // fetch(process.env.REACT_APP_HOST + "/api/slots/roll")
    //   .then((res) => res.json())
    //   .then((res: ServerResponse) => {
    //     if (res.success == false) {
    //       toastr.error(res.data.error);
    //     } else {
    //       let spin: SlotMachineSpin = res.data;
    //       if (spin.reward > 0) {
    //         toastr.success(`Won ${spin.reward.toString()}!`);
    //       } else {
    //         toastr.info(`No winnings`);
    //       }
    //     }

    //     getSpinHistory();
    //     getUserData();
    //   });

    props.startSpin();
  };

  const getRewardRequirements = () => {
    fetch(`https://stark-sea-70808.herokuapp.com/api/slots/score-sheet`)
      .then((res) => res.json())
      .then((res: ServerResponse) => {
        setRewardRequirements(res.data);
      });
    props.getRewardRequirements();
  };

  const getUserData = () => {
    // fetch(`https://stark-sea-70808.herokuapp.com/api/users/`)
    //   .then((res) => res.json())
    //   .then((res: ServerResponse) => {
    //     setUserData(res.data[0]);
    //   });
    props.getUser();
  };

  const getSpinHistory = () => {
    // fetch(`https://stark-sea-70808.herokuapp.com/api/slots/spin-history`)
    //   .then((res) => res.json())
    //   .then((res: ServerResponse) => {
    //     setSpinHistory(res.data);
    //   });
    props.getSpinHistory();

  };

  React.useEffect(() => {
    getSpinHistory();
    getUserData();
    getRewardRequirements();
  }, []);

  const reset = () => {
    Swal.fire({
      title: "Are you sure you want to reset?",
      text: "This will reset your history and money.",
      showCancelButton: true,
      background: "danger",
    }).then((result: SweetAlertResult) => {
      if (result.value) {
        fetch(`${process.env.REACT_APP_HOST}/api/slots/reset`)
          .then((res) => res.json())
          .then((res: ServerResponse) => {
            if (res.success) {
              toastr.success("Reset successful", "Successfully reset slots!");
              getSpinHistory();
              getUserData();
            } else {
              toastr.success("Reset error", res.data.error);
            }
          });
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
            <SlotMachineScoreSheet rewardRequirements={props.slotState.rewardRequirements} />
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
};

interface LinkStateProps {
  slotState: SlotsState;
}

interface LinkDispatchProps {
  getUser: () => void;
  getSpinHistory: () => void;
  startSpin: () => void;
  startResetSlots: () => void;
  getRewardRequirements: () => void;
}

const mapStateToProps = (state: AppState, props: any): LinkStateProps => ({
  slotState: state.slots,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  props: any
): LinkDispatchProps => ({
  getSpinHistory: bindActionCreators(startGetSpinHistory, dispatch),
  getUser: bindActionCreators(startGetUser, dispatch),
  startResetSlots: bindActionCreators(startResetSlots, dispatch),
  getRewardRequirements: bindActionCreators(
    startGetRewardRequirements,
    dispatch
  ),
  startSpin: bindActionCreators(startSpin, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SlotMachine);
