import React, { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2';
import { casesTypeColors } from '../../base/_utils'
import './LineGraph.scss'

const options = {
    legend: {
        display: false
    },
    elements: {
        point: {
            radius: 0
        }
    },
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
        mode: 'index',
        intersect: false,

    },
    layout: {
        padding: 10,
    },
    scales: {
        xAxes: [
            {
                type: 'time',
                time: {
                    format: 'MM/DD/YY',
                    tooltipFormat: 'll'
                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    display: false
                }

            }
        ]
    }
}

function LineGraph({ casesType = 'cases', type }) {
    const [lineData, setLineData] = useState()

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=200')
            .then((response) => response.json())
            .then((data) => {
                let chartData = buildChartData(data, casesType)
                setLineData(chartData)
            })
    }, [casesType]);
    const buildChartData = (data, casesType) => {
        let chartData = [];
        let lastDataPoint;
        for (let date in data.cases) {
            if (lastDataPoint) {
                let newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                };
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    }
    return (
        <div className="line">
            {lineData?.length > 0 && (
                type === 'line' ?
                    <Line
                        options={options}
                        data={{
                            datasets: [{
                                fill: false,
                                data: lineData,
                                backgroundColor: casesTypeColors[casesType]?.hex,
                                borderColor: casesTypeColors[casesType]?.hex
                            }]
                        }}
                    ></Line>
                    :
                    <Bar
                        options={options}
                        data={{
                            datasets: [{
                                fill: false,
                                data: lineData,
                                backgroundColor: casesTypeColors[casesType]?.hex,
                                borderColor: casesTypeColors[casesType]?.rgb
                            }]
                        }}
                    ></Bar>

            )
            }
        </div >
    )
}

export default LineGraph
