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
  }

  roll = async (request: Request, response: Response) => {
    slotService
      .spin()
      .then((spinResult: SlotMachineSpin) => {
        response.send(new ServerResponse(true, "Spin succesful!", spinResult));
      })
      .catch((error) => {
        logger.error(error);
        response.send(
          new ServerResponse(true, "Something went wrong!", { error: error })
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
          new ServerResponse(true, "Something went wrong!", { error: error })
        );
      });
  };
}

export default SlotsController;
