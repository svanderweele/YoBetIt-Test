import express, { Request, Response } from "express";
import Database from "../../src/database";
import ServerResponse from "../../../client/src/models/ServerResponse";
import {
  SlotMachineRewardRequirement,
  SlotMachinePatternType,
  SlotMachinePatternTypeEnum,
} from "../../../client/src/models/SlotMachine";
import { logger } from "../../src/utilities/winston";

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

  roll = async (request: Request, response: Response) => {};
  getScoreSheet = async (request: Request, response: Response) => {
    Database.query("SELECT * from reward_requirements").then((rows: any) => {
      let requirements: SlotMachineRewardRequirement[] = rows.map(
        (row: any) => {
          return new SlotMachineRewardRequirement(
            row.id,
            row.pattern.split(","),
            row.reward
          );
        }
      );

      const slotTypes = Database.query("select * from spin_types").then(
        (rows: SlotMachinePatternType[]) => {
          requirements.forEach((requirement: SlotMachineRewardRequirement) => {
            const types = this.getTypesFromId(requirement.pattern, rows);
            requirement.patternString = types
              .map((type: SlotMachinePatternType) => type.name)
              .join(",");
          });

          logger.info("Reqs " + JSON.stringify(requirements));

          response.send(
            new ServerResponse(true, "Requirements retrieved!", requirements)
          );
        }
      );
    });
  };

  getTypesFromId = (
    typeIds: number[],
    types: SlotMachinePatternType[]
  ): SlotMachinePatternType[] => {
    let returnedTpyes: SlotMachinePatternType[] = [];
    for (let i = 0; i < typeIds.length; i++) {
      returnedTpyes[i] = types.filter((type: SlotMachinePatternType) => {
        return type.id == typeIds[i];
      })[0];
    }
    return returnedTpyes;
  };
}

export default SlotsController;
