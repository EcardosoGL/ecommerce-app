import { useCountryStore } from "../stores/useCountryStore";

export const validateCountry = async (country: string) => {
  const { countryService } = useCountryStore.getState();
  const countries = await countryService.getCountries();
  return countries.some((c) => c.name.common.toLowerCase() === country.toLowerCase());
};
