import Database from "../database";
import {
  SlotMachineRewardRequirement,
  SlotMachinePatternType,
  SlotMachineSpin,
  SlotMachinePatternTypeEnum,
} from "../models/SlotMachine";
import moment from "moment";
import { User } from "../models/User";
import { UserService, IUserService } from "./users.service";
import { UserDalMongoDb } from "./users.dal";
import { ISlotDal, SlotDalMongoDb } from "./slots.dal";

export interface ISlotService {
  spin: () => Promise<SlotMachineSpin>;
  resetSlots: () => Promise<any>;
  getHistory: () => Promise<SlotMachineSpin[]>;
  getScoreSheet: () => Promise<SlotMachineRewardRequirement[]>;
}

class SlotService implements ISlotService {
  private slotDal: ISlotDal;
  private userService: IUserService;
  constructor(dal: ISlotDal, userService: IUserService) {
    this.slotDal = dal;
    this.userService = userService;
  }

  spin = (): Promise<SlotMachineSpin> => {
    return new Promise<SlotMachineSpin>((resolve, reject) => {
      try {
        const playCost: number = 1;

        this.userService.getUsers().then((users: User[]) => {
          const user: User = users[0];

          if (user.money <= 0) {
            reject("Player is out of money!");
            return;
          }

          this.slotDal
            .getRewardRequirements()
            .then((requirements: SlotMachineRewardRequirement[]) => {

              const reelOptions = [
                [3, 4, 1, 4, 2, 2, 4, 4],
                [4, 1, 4, 4, 3, 1, 2, 4],
                [4, 1, 4, 1, 3, 4, 2, 4],
              ];

              const rollResults: SlotMachinePatternTypeEnum[] = [];
              for (let i = 0; i < 3; i++) {
                rollResults[i] =
                  reelOptions[i][
                    Math.floor(Math.random() * reelOptions[i].length)
                  ];
              }

              const matchedPatterns: SlotMachineRewardRequirement[] = [];
              // Check for matches
              for (
                let requirementIndex = 0;
                requirementIndex < requirements.length;
                requirementIndex++
              ) {
                const requirementPattern: SlotMachinePatternTypeEnum[] = requirements[
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
              matchedPatterns.forEach(
                (pattern: SlotMachineRewardRequirement) => {
                  if (
                    mostValuablePattern == null ||
                    pattern.pattern.length > mostValuablePattern.pattern.length
                  ) {
                    mostValuablePattern = pattern;
                  }
                }
              );

              const reward: number = mostValuablePattern
                ? mostValuablePattern.reward
                : 0;
              this.slotDal
                .getSlotTypes()
                .then((rows: SlotMachinePatternType[]) => {
                  const types = this.getTypesFromId(rollResults, rows);
                  const rollResultString: string = types
                    .map((type: SlotMachinePatternType) => type.name)
                    .join(", ");

                  const spin = new SlotMachineSpin(
                    new Date(),
                    rollResultString,
                    1,
                    reward
                  );

                  Database.query(
                    `UPDATE users SET money=money+${reward}-${playCost}`
                  ).then(() => {
                   this.slotDal.addSpin(spin).then((rows: any) => {
                      resolve(spin);
                    }).catch(error => console.log(error));
                  });
                });
            });
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  resetSlots = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      try {
        Database.query(`UPDATE users set money=20`).then(() => {
          return Database.query(`DELETE from spins`).then(resolve);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  getHistory = (): Promise<SlotMachineSpin[]> => {
    return new Promise((resolve, reject) => {
      this.slotDal.getSpinHistory()
        .then((spins: SlotMachineSpin[]) => {
          resolve(spins);
        })
        .catch((error) => reject(error));
    });
  };

  getScoreSheet = (): Promise<SlotMachineRewardRequirement[]> => {
    return new Promise<SlotMachineRewardRequirement[]>((resolve, reject) => {
      try {
        this.slotDal
          .getRewardRequirements()
          .then((requirements: SlotMachineRewardRequirement[]) => {
            this.slotDal
              .getSlotTypes()
              .then((rows: SlotMachinePatternType[]) => {
                requirements.forEach(
                  (requirement: SlotMachineRewardRequirement) => {
                    const types = this.getTypesFromId(
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
          });
      } catch (error) {
        reject(error);
      }
    });
  };

  getTypesFromId = (
    typeIds: number[],
    types: SlotMachinePatternType[]
  ): SlotMachinePatternType[] => {
    const returnedTpyes: SlotMachinePatternType[] = [];
    for (let i = 0; i < typeIds.length; i++) {
      returnedTpyes[i] = types.filter((type: SlotMachinePatternType) => {
        return type.id == typeIds[i];
      })[0];
    }
    return returnedTpyes;
  };
}

export default SlotService;
