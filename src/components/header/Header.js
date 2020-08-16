import React, { useEffect, useState } from 'react'
import './Header.scss';
import ComboBox from '../combobox/ComboBox';

function Header({ cardInfo }) {
    const [countries, setCountries] = useState([])


    useEffect(() => {
        const getCountriesData = async () => {
            await fetch('https://disease.sh/v3/covid-19/countries')
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map((country) => ({
                        name: country.country
                    }));
                    setCountries(countries);
                })
        }
        getCountriesData();
    }, [])
    const onCountryChange = async (countryCode) => {
        const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' :
            `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                cardInfo(data);
            })
    };
    return (
        <header className="header">
            <div className="header__title">
                <span className="header__icon"></span>
                <span className="header__title__text">
                    <span className="header__part">covid-19</span>tracker
                </span>
            </div>
            <ComboBox countries={countries} onChange={onCountryChange}></ComboBox>
        </header>
    )
}

export default Header
