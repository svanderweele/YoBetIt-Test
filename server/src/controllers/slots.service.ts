import Database from "../../src/database";
import {
  SlotMachineRewardRequirement,
  SlotMachinePatternType,
  SlotMachineSpin,
  SlotMachinePatternTypeEnum,
} from "../../../client/src/models/SlotMachine";
import { logger } from "../../src/utilities/winston";

class SlotService {
  static spin = (): Promise<SlotMachineSpin> => {
    return new Promise<SlotMachineSpin>((resolve, reject) => {
      try {
        Database.query("SELECT * from reward_requirements").then(
          (rows: any) => {
            const requirements: SlotMachineRewardRequirement[] = rows.map(
              (row: any) => {
                return new SlotMachineRewardRequirement(
                  row.id,
                  row.pattern.split(","),
                  row.reward
                );
              }
            );

            const reelOptions = [
              [3, 4, 1, 4, 2, 2, 4, 4],
              [4, 1, 4, 4, 3, 1, 2, 4],
              [4, 1, 4, 1, 3, 4, 2, 4],
            ];

            let rollResults: SlotMachinePatternTypeEnum[] = [];
            for (let i = 0; i < 3; i++) {
              rollResults[i] =
                reelOptions[i][
                  Math.floor(Math.random() * reelOptions[i].length)
                ];
            }

            let matchedPatterns: SlotMachineRewardRequirement[] = [];
            //Check for matches
            for (
              let requirementIndex = 0;
              requirementIndex < requirements.length;
              requirementIndex++
            ) {
              let requirementPattern: SlotMachinePatternTypeEnum[] = requirements[
                requirementIndex
              ].pattern.slice();
              for (
                let rollIndex = 0;
                rollIndex < rollResults.length;
                rollIndex++
              ) {
                for (
                  let patternIndex = requirementPattern.length - 1;
                  patternIndex >= 0;
                  patternIndex--
                ) {
                  if (requirementPattern.length == 0) break;

                  const match =
                    requirementPattern[patternIndex].valueOf() ==
                    rollResults[rollIndex].valueOf();

                  if (match) {
                    requirementPattern.splice(patternIndex, 1);
                    break;
                  }
                }
              }

              if (requirementPattern.length == 0) {
                matchedPatterns.push(requirements[requirementIndex]);
              }
            }

            let mostValuablePattern: SlotMachineRewardRequirement = null;
            matchedPatterns.forEach((pattern: SlotMachineRewardRequirement) => {
              if (
                mostValuablePattern == null ||
                pattern.pattern.length > mostValuablePattern.pattern.length
              ) {
                mostValuablePattern = pattern;
              }
            });

            const reward = mostValuablePattern?.reward;

            Database.query("select * from spin_types").then(
              (rows: SlotMachinePatternType[]) => {
                const types = SlotService.getTypesFromId(rollResults, rows);
                const rollResultString: string = types
                  .map((type: SlotMachinePatternType) => type.name)
                  .join(",");

                const spin = new SlotMachineSpin(
                  new Date(),
                  rollResultString,
                  1,
                  reward
                );

                resolve(spin);
              }
            );
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  };

  static getScoreSheet = (): Promise<SlotMachineRewardRequirement[]> => {
    return new Promise<SlotMachineRewardRequirement[]>((resolve, reject) => {
      try {
        Database.query("SELECT * from reward_requirements").then(
          (rows: any) => {
            let requirements: SlotMachineRewardRequirement[] = rows.map(
              (row: any) => {
                return new SlotMachineRewardRequirement(
                  row.id,
                  row.pattern.split(","),
                  row.reward
                );
              }
            );

            Database.query("select * from spin_types")
              .then((rows: SlotMachinePatternType[]) => {
                requirements.forEach(
                  (requirement: SlotMachineRewardRequirement) => {
                    const types = SlotService.getTypesFromId(
                      requirement.pattern,
                      rows
                    );
                    requirement.patternString = types
                      .map((type: SlotMachinePatternType) => type.name)
                      .join(",");
                  }
                );
                resolve(requirements);
              })
              .catch((error) => {
                reject(error);
              });
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  };

  static getTypesFromId = (
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

export default SlotService;
