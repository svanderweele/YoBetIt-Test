import express, { Request, Response } from "express";
import ServerResponse from "../../../client/src/models/ServerResponse";
import slotService from "./slots.service";
import { logger } from "../../src/utilities/winston";
import { SlotMachineSpin } from "../../../client/src/models/SlotMachine";

interface GetAllCountriesQuery {
  countryNames?: string;
  fields?: string;
  isExactNameMatch?: string;
}

class SlotsController {
  public path = "/api/slots";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path + "/roll", this.roll);
    this.router.get(this.path + "/score-sheet", this.getScoreSheet);
    this.router.get(this.path + "/spin-history", this.getHistory);
    this.router.get(this.path + "/reset", this.resetSlots);
  }

  roll = async (request: Request, response: Response) => {
    slotService
      .spin()
      .then((spinResult: SlotMachineSpin) => {
        response.send(new ServerResponse(true, "Spin succesful!", spinResult));
      })
      .catch((error) => {
        response.send(
          new ServerResponse(false, "Something went wrong!", { error })
        );
      });
  };

  getHistory = (request: Request, response: Response) => {
    slotService
      .getHistory()
      .then((spins) => {
        response.send(new ServerResponse(true, "Got history!", spins));
      })
      .catch((error) => {
        response.send(
          new ServerResponse(false, "Something went wrong!", { error })
        );
      });
  };

  resetSlots = (request: Request, response: Response) => {
    slotService
      .resetSlots()
      .then(() => {
        response.send(new ServerResponse(true, "Reset slots!"));
      })
      .catch((error) => {
        response.send(
          new ServerResponse(false, "Something went wrong!", { error })
        );
      });
  };

  getScoreSheet = async (request: Request, response: Response) => {
    slotService
      .getScoreSheet()
      .then((value) => {
        response.send(
          new ServerResponse(true, "Requirements retrieved!", value)
        );
      })
      .catch((error) => {
        response.send(
          new ServerResponse(false, "Something went wrong!", { error })
        );
      });
  };
}

export default SlotsController;
