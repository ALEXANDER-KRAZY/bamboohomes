import React, { useState } from 'react';
import useCountryStateCity from '../../hooks/useCountryStateCity';

const CountryStateCitySelect = () => {
    const { getAllCountries, getStatesByCountry, getCitiesByState } = useCountryStateCity();
    const countries = getAllCountries();

    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedState, setSelectedState] = useState<string>('');
    const [states, setStates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);

    const handleCountryChange = (isoCode: string) => {
        setSelectedCountry(isoCode);
        setStates(getStatesByCountry(isoCode));
        setCities([]);
    };

    const handleStateChange = (isoCode: string) => {
        setSelectedState(isoCode);
        setCities(getCitiesByState(selectedCountry, isoCode));
    };

    return (
        <div>
            <div>
                <h2>Countries</h2>
                {countries.map((country) => (
                    <div key={country.isoCode} onClick={() => handleCountryChange(country.isoCode)}>
                        <img src={country.flag} alt={`${country.label} flag`} />
                        <span>{country.label}</span>
                    </div>
                ))}
            </div>
            <div>
                <h2>States</h2>
                {states.map((state) => (
                    <div key={state.isoCode} onClick={() => handleStateChange(state.isoCode)}>
                        <span>{state.label}</span>
                    </div>
                ))}
            </div>
            <div>
                <h2>Cities</h2>
                {cities.map((city, index) => (
                    <div key={index}>
                        <span>{city.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CountryStateCitySelect