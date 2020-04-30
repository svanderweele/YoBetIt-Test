import { User } from "../models/User";
import Database from "../database";
import { MongoClient, MongoError, Db } from "mongodb";
import { logger } from "../utilities/winston";
import {
  SlotMachineRewardRequirement,
  SlotMachinePatternType,
  SlotMachineSpin,
} from "../models/SlotMachine";
import moment from "moment";
import { resolve } from "dns";

export interface ISlotDal {
  getSpinHistory: () => Promise<SlotMachineSpin[]>;
  getRewardRequirements: () => Promise<SlotMachineRewardRequirement[]>;
  getSlotTypes: () => Promise<SlotMachinePatternType[]>;
  addSpin: (spin: SlotMachineSpin) => Promise<SlotMachineSpin>;
  resetSlotMachine: () => Promise<boolean>;
}

class SlotDalSql implements ISlotDal {
  getRewardRequirements = (): Promise<SlotMachineRewardRequirement[]> => {
    return new Promise<SlotMachineRewardRequirement[]>((resolve, reject) =>
      Database.query<any[]>("SELECT * from reward_requirements").then(
        (rows) => {
          resolve(
            rows.map(
              (requirement) =>
                new SlotMachineRewardRequirement(
                  requirement.pattern.split(","),
                  requirement.reward,
                  requirement.id
                )
            )
          );
        }
      )
    );
  };

  getSlotTypes = (): Promise<SlotMachinePatternType[]> => {
    return Database.query<SlotMachinePatternType[]>("select * from spin_types");
  };

  getSpinHistory = (): Promise<SlotMachineSpin[]> => {
    return Database.query<SlotMachineSpin[]>("select * from spins");
  };

  addSpin = (spin: SlotMachineSpin): Promise<SlotMachineSpin> => {
    return Database.query(
      `INSERT INTO spins (date, result, user_id, reward) VALUES("${moment(
        spin.date
      ).format("YYYY/MM/DD HH:mm:ss")}", "${spin.result}", "${spin.userId}", "${
        spin.reward
      }")`
    );
  };
  resetSlotMachine = (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      Database.query(`UPDATE users set money=20 AND DELETE from spins`)
        .then((rows) => resolve(true))
        .catch((error) => reject(error));
    });
  };
}

class SlotDalMongoDb implements ISlotDal {
  private uri: string =
    "mongodb+srv://Simon:OOZeoX5bXGbWR9KS@cluster0-n4iai.gcp.mongodb.net/test?retryWrites=true&w=majority";
  private client: MongoClient = new MongoClient(this.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  private db: Db;

  constructor() {
    this.client
      .connect()
      .then((client) => {
        this.db = client.db("yobetittypescript");
      })
      .catch((error: MongoError) => logger.error(error.errmsg));
  }
  addSpin = (spin: SlotMachineSpin): Promise<SlotMachineSpin> => {
    return new Promise<SlotMachineSpin>((resolve, reject) => {
      try {
        this.getSpinHistory().then((history) => {
          this.db.collection("spins").insertOne({
            user_id: spin.userId,
            date: spin.date,
            result: spin.result,
            reward: spin.reward,
            id: history.length + 1,
          });
          resolve(spin);
        });
      } catch (error) {
        reject(error);
      }
    });
  };
  getSpinHistory = (): Promise<SlotMachineSpin[]> => {
    return new Promise<SlotMachineSpin[]>((resolve, reject) => {
      try {
        this.db
          .collection("spins")
          .find()
          .toArray(function (err: MongoError, result: SlotMachineSpin[]) {
            if (err) throw err;
            resolve(result);
          });
      } catch (error) {
        reject(error);
      }
    });
  };
  getSlotTypes = (): Promise<SlotMachinePatternType[]> => {
    return new Promise<SlotMachinePatternType[]>((resolve, reject) => {
      try {
        this.db
          .collection("slotTypes")
          .find()
          .toArray(function (
            err: MongoError,
            result: SlotMachinePatternType[]
          ) {
            if (err) throw err;
            resolve(result);
          });
      } catch (error) {
        reject(error);
      }
    });
  };

  getRewardRequirements = (): Promise<SlotMachineRewardRequirement[]> => {
    return new Promise<SlotMachineRewardRequirement[]>((resolve, reject) => {
      try {
        this.db
          .collection("rewardRequirements")
          .find()
          .toArray(function (err: MongoError, result: any) {
            if (err) throw err;

            resolve(
              result.map(
                (requirement: any) =>
                  new SlotMachineRewardRequirement(
                    requirement.pattern.split(","),
                    requirement.reward,
                    requirement.id
                  )
              )
            );
            resolve(result);
          });
      } catch (error) {
        reject(error);
      }
    });
  };

  resetSlotMachine = (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      this.db
        .collection("spins")
        .deleteMany({})
        .then((rows) => resolve(true))
        .catch((error) => reject(error));
    });
  };
}

export { SlotDalSql, SlotDalMongoDb };
