import React, { useEffect, useState } from 'react'
import './Table.scss';
import { convertTorReadableFormat } from "../../base/_utils.js";

function Table({ countryInfo }) {
    const [data, setData] = useState({})
    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/countries')
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
    }, []);
    return (
        <div className="table">
            <table>
                <tr>
                    <th>#</th>
                    <th>Country</th>
                    <th>New Cases</th>
                    <th>Total Cases</th>
                    <th>Recovered</th>
                    <th>Total Recovered</th>
                    <th>Deceased</th>
                    <th>Today Deceased</th>
                </tr>
                <tbody>
                    {
                        data.length > 0 && data.map((country, index) => {
                            let todayCases = country.todayCases,
                                cases = country.cases,
                                todayRecovered = country.todayRecovered,
                                recovered = country.recovered,
                                todayDeaths = country.deaths,
                                deaths = country.deaths;
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{country.country}</td>
                                    <td className={todayCases > 0 && 'red'}>{todayCases > 0 ? `+${convertTorReadableFormat(todayCases)}` : convertTorReadableFormat(todayCases)}</td>
                                    <td>{convertTorReadableFormat(cases)}</td>
                                    <td className={todayRecovered > 0 && 'green'}>{todayRecovered > 0 ? `+${convertTorReadableFormat(todayRecovered)}` : convertTorReadableFormat(todayRecovered)}</td>
                                    <td>{convertTorReadableFormat(recovered)}</td>
                                    <td className={todayDeaths > 0 && 'black'}>{todayDeaths > 0 ? `+${convertTorReadableFormat(todayDeaths)}` : convertTorReadableFormat(todayDeaths)}</td>
                                    <td>{convertTorReadableFormat(deaths)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table
