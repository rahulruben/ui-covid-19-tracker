import React from 'react'
// import numeral from 'numeral'
import { Circle, Popup } from 'react-leaflet';

export const casesTypeColors = {
    cases: {
        hex: "#d43545",
        rgb: 'rgb(204, 16, 52)',
        multiplier: 800
    },
    recovered: {
        hex: "#00b85c",
        rgb: 'rgb(125, 215, 29)',
        multiplier: 1200
    },
    deaths: {
        hex: "#4b514e",
        rgb: 'rgb(75, 81, 78, 0.4)',
        multiplier: 2000
    }
}

export const convertTorReadableFormat = (number) => {
    if (!number) return;
    const readableNumber = number.toString();
    let lastThree = readableNumber.substring(readableNumber.length - 3),
        otherNumbers = readableNumber.substring(0, readableNumber.length - 3);
    if (otherNumbers !== '')
        lastThree = ',' + lastThree;
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
}

export const sort = (data, option) => {
    const sortedData = [...data];
    return sortedData.sort((a, b) => a.cases > b.cases ? -1 : 1);
}

export const showDataOnMap = (data, casesType = "cases") => (
    data?.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
        >
            <Popup>
                <div className="info-container">
                    <div className="info-flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                    />
                    <div className="info-name">{country.country}</div>
                    <div className="info-cases">Cases: {convertTorReadableFormat(country.cases)}</div>
                    <div className="info-recovered">Recovered: {convertTorReadableFormat(country.recovered)}</div>
                    <div className="info-deaths">Deaths: {convertTorReadableFormat(country.deaths)}</div>
                </div>
            </Popup>
        </Circle>
    ))
)