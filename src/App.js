import React, { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/header/Header';
import Card from './components/card/Card';
import Map from './components/Map/Map';
import 'leaflet/dist/leaflet.css';
import LineGraph from './components/LineGraph/LineGraph';
import Table from './components/table/Table';

function App() {
	const [countryInfo, setCountryInfo] = useState({}),
		[mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 }),
		[mapZoom, setMapZoom] = useState(3),
		[mapData, setMapData] = useState(),
		[casesType, setCasesType] = useState();


	const onCountryChanged = (value) => {
		setCountryInfo(value);
		setMapCenter([value.countryInfo.lat, value.countryInfo.long]);
		setMapZoom(3);
	}

	useEffect(() => {
		fetch('https://disease.sh/v3/covid-19/all')
			.then((response) => response.json())
			.then((data) => {
				setCountryInfo(data);
			})
	}, []);

	useEffect(() => {
		const getCountriesData = async () => {
			await fetch('https://disease.sh/v3/covid-19/countries')
				.then((response) => response.json())
				.then((data) => {
					setMapData(data);
				})
		}
		getCountriesData();
	}, [])

	return (

		<div className="app">
			<Header cardInfo={onCountryChanged}></Header>
			<div className="app__stage">

				<div className="app__stage__guidelines">
					<ul>
						<li>
							<span className="app__stage__guidelines__icon"></span>
							<span className="app__stage__guidelines__text">
								<span className="app__stage__guidelines__text__capital">wash </span> you hands well and often
							</span>
						</li>
						<li>
							<span className="app__stage__guidelines__icon"></span>
							<span className="app__stage__guidelines__text">
								<span className="app__stage__guidelines__text__capital">cover </span> your mouth and nose
							</span>
						</li>
						<li>
							<span className="app__stage__guidelines__icon"></span>
							<span className="app__stage__guidelines__text">
								<span className="app__stage__guidelines__text__capital">stop </span> shaking hands
							</span>
						</li>
					</ul>

				</div>
				<div className="animation">
					<ul className="animation__box">
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
					</ul>
				</div>
				<div className="app__stage__symtoms">
					<h4 className="app__stage__symtoms__title">symtoms</h4>
					<div className="app__stage__symtoms__contents">
						<span className="app__stage__symtoms__contents__item fever">
							<span></span>
						</span>
						<span className="app__stage__symtoms__contents__item breathing">
							<span></span>
						</span>
						<span className="app__stage__symtoms__contents__item cough">
							<span></span>
						</span>
						<span className="app__stage__symtoms__contents__item lungs">
							<span></span>
						</span>
					</div>
				</div>
			</div>

			<div className="app__covid__info">
				<div className="app__cards">
					<Card onClick={e => setCasesType('cases')} title="Cases" cases={countryInfo.todayCases} total={countryInfo.cases}></Card>
					<Card onClick={e => setCasesType('recovered')} title="Recovered" cases={countryInfo.todayDeaths} total={countryInfo.deaths}></Card>
					<Card onClick={e => setCasesType('deaths')} title="Deceased" cases={countryInfo.todayRecovered} total={countryInfo.recovered}></Card>
				</div>

				<div className="app__stats__graph">
					<LineGraph type="line" casesType={casesType}></LineGraph>
					<LineGraph type="bar" casesType={casesType}></LineGraph>
				</div>
				<div className="app__stats__map">
					<Map countries={mapData} casesType={casesType} center={mapCenter} zoom={mapZoom} />
					<Table countries={countryInfo}></Table>
				</div>
			</div>
		</div>
	);
}

export default App;
