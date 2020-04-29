export class Country {
  id: number;
  flag: string;
  name: string;
  constructor(
    id: number,
    flag: string,
    name: string
  ) {
    this.id = id;
    this.flag = flag;
    this.name = name;
  }
}

export interface GetAllCountriesQuery {
  countryNames?: string;
  fields?: string;
  isExactNameMatch?: string;
}