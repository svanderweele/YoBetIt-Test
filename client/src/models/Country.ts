class Country {
  id: number;
  flag: string;
  name: string;
  activeCoronaCases: number;
  constructor(
    id: number,
    flag: string,
    name: string,
    activeCoronaCases: number
  ) {
    this.id = id;
    this.flag = flag;
    this.name = name;
    this.activeCoronaCases = activeCoronaCases;
  }
}

export {Country};