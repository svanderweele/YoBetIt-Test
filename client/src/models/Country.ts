class Country {
  flag: string;
  name: string;
  activeCoronaCases: number;

  constructor(flag: string, name: string, activeCoronaCases: number) {
    this.flag = flag;
    this.name = name;
    this.activeCoronaCases = activeCoronaCases;
  }
}

class Response {
  message: string;
  success: boolean;
  constructor(success: boolean, message: string) {
    this.success = success;
    this.message = message;
  }
}

class GetCountriesResponse extends Response {
  countries: Country[];
  constructor(success: boolean, message: string, countries: Country[]) {
    super(success, message);
    this.countries = countries;
  }
}

export { Country, GetCountriesResponse };
