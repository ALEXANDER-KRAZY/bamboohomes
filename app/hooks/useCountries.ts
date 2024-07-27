import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    region: country.region,
    flag: country.flag,
    latlng: country.latlng //latitude and longitude
}));

const useCountries = () => {
    const getAll = () => formattedCountries;

    const getByValue = (value: string) => {
        return formattedCountries.find((item) => item.value === value);
    }

    return {
        getAll,
        getByValue
    }
};

export default useCountries;

/* Calls a defined callback function on each element of an array, and returns an array that contains the results.

 * @param callbackfn — A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.

 * @param thisArg — An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
 */