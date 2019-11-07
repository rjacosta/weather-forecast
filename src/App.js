import React, { Component } from "react";
import "./style.css";
import WeatherTile from "./components/WeatherTile";

var apiBaseURL = 'http://api.openweathermap.org/data/2.5/forecast'
var apiKey = 'dad308e1e9508fb8704e0e28fd983111';
var cityKey = '5345679'; // Key for El Dorado Hills

var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var days = [0, 1, 2, 3, 4, 5, 6]

var SUNNY = "Clear";
var CLOUDY = "Cloud";
var SNOWY = "Snow";
var RAINY = "Rain";

function getWeeklyDays() {

  var currentDate = new Date();
  if (currentDate.getDay() === 0) {
    return days;
  }
  days = days
  .slice(currentDate.getDay())
  .concat(days.slice(0, currentDate.getDay()))
  return days;
}

function createWeatherTiles(weatherData) {
  if (weatherData === null) return null;
  return weatherData.map(data => {
    data.day = weekdays[data.day]
    return <li key={data.day}><WeatherTile className="Weather-Tile" data={data} /></li>
  });
}

function kelvinToFahrenheit(k) {
  return (k - 273.15) * 9/5 + 32;
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weatherData: null
    };
  }

  componentDidMount() {
    getWeeklyDays();
    fetch(apiBaseURL + '?id=' + cityKey + '&APPID=' + apiKey)
    .then(response => response.json())
    .then(weatherData => {
      var weatherPoints = weatherData.list;
      weatherPoints.forEach(point => {
        // dt is in unix time, need to convert to js
        point.jsDay = new Date(point.dt * 1000).getDay();
      });
      var filteredWeatherData = [];
      days.forEach(day => {
        var filteredPoints = weatherPoints.filter(point => point.jsDay === day);
        if (filteredPoints.length === 0) return;
        var maxTemp = Number.MIN_SAFE_INTEGER, minTemp = Number.MAX_SAFE_INTEGER;
        var weatherCounter = {
          sunny: 0,
          cloudy: 0,
          snowy: 0,
          rainy: 0
        }
        filteredPoints.forEach(point => {
          if (point.weather[0].main === SUNNY) weatherCounter.sunny++;
          if (point.weather[0].main === CLOUDY) weatherCounter.cloudy++;
          if (point.weather[0].main === SNOWY) weatherCounter.snowy++;
          if (point.weather[0].main === RAINY) weatherCounter.rainy++;
          if (point.main.temp_max > maxTemp) maxTemp = point.main.temp_max;
          if (point.main.temp_min < minTemp) minTemp = point.main.temp_min;
        })
        filteredWeatherData.push({
          day: day,
          weather: Object.keys(weatherCounter).reduce((a, b) => weatherCounter[a] > weatherCounter[b] ? a : b),
          maxTemp: Math.round(kelvinToFahrenheit(maxTemp)), 
          minTemp: Math.round(kelvinToFahrenheit(minTemp))
        })
      })
      this.setState({
        weatherData: filteredWeatherData
      })
    })
  }

  render() {
    var weatherTiles = createWeatherTiles(this.state.weatherData);
    return (
      <div className="App">
        <ul className="list-style">{weatherTiles}</ul>
        <footer></footer>
      </div>
    );
  }

}

export default App;
