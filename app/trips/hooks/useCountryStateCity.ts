import { Country, State, City } from 'country-state-city';

// Format the country data
const formattedCountries = Country.getAllCountries().map((country) => ({
    isoCode: country.isoCode,
    flag: country.flag,
    label: country.name,
    latitude: country.latitude,
    longitude: country.longitude
}));

const useCountryStateCity = () => {
    // Function to get all countries
    const getAllCountries = () => formattedCountries;

    // Function to get states based on selected country ISO code
    const getStatesByCountry = (countryIsoCode: string) => {
        return State.getStatesOfCountry(countryIsoCode).map((state) => ({
            isoCode: state.isoCode,
            label: state.name,
            countryIsoCode: state.countryCode
        }));
    };

    // Function to get cities based on selected state ISO code and country ISO code
    const getCitiesByState = (countryIsoCode: string, stateIsoCode: string) => {
        return City.getCitiesOfState(countryIsoCode, stateIsoCode).map((city) => ({
            label: city.name,
            stateIsoCode: city.stateCode,
            countryIsoCode: city.countryCode
        }));
    };

    return {
        getAllCountries,
        getStatesByCountry,
        getCitiesByState
    };
};

export default useCountryStateCity;
