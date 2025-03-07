import { create } from "zustand";
import { CountryService } from "../services/CountryService";

interface CountryStore {
  countryService: CountryService;
}

export const useCountryStore = create<CountryStore>(() => ({
  countryService: new CountryService(),
}));
