import { Country } from "../types/types";

export class CountryService {
  private apiUrl: string;

  constructor(apiUrl = "https://restcountries.com/v3.1/region/america") {
    this.apiUrl = apiUrl;
  }

  async getCountries(): Promise<Country[]> {
    const response = await fetch(this.apiUrl);
    return response.json();
  }
}
