enum SlotMachinePatternTypeEnum {
  Apple = 0,
  Banana = 1,
  Cherry = 2,
  Lemon = 3,
}

class SlotMachineSpin {
  id?: number;
  date: Date;
  result: string;
  userId: number;
  reward: number;

  constructor(
    date: Date,
    result: string,
    userId: number,
    reward: number
  ) {
    this.date = date;
    this.result = result;
    this.userId = userId;
    this.reward = reward;
  }
}

class SlotMachinePatternType {
  id: number;
  name: string;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

class SlotMachineRewardRequirement {
  id?:number;
  pattern: SlotMachinePatternTypeEnum[];
  patternString?: string;
  reward: number;
  constructor(pattern: SlotMachinePatternTypeEnum[], reward: number, id?:number) {
    this.pattern = pattern;
    this.reward = reward;
    this.id = id;
  }
}

export { SlotMachinePatternType, SlotMachineSpin, SlotMachineRewardRequirement, SlotMachinePatternTypeEnum };