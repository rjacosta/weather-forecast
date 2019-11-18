import React, { useState, useEffect } from "react";
import "./style.css";
import WeatherTile from "./components/WeatherTile";
import * as Constants from "./constants/index";
import { Spinner } from "spin.js";

var apiBaseURL = "http://api.openweathermap.org/data/2.5/forecast";
var apiKey = "dad308e1e9508fb8704e0e28fd983111";
var cityKey = "5345679"; // Key for El Dorado Hills

var weekDays = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat"
};

function App() {
  const [weatherData, setWeatherData] = useState(null);

  function getWeatherData(spinner) {
    spinner.spin();

    fetch(apiBaseURL + "?id=" + cityKey + "&APPID=" + apiKey)
      .then(response => {
        spinner.stop();
        return response.json();
      })
      .then(weatherData => {
        if (weatherData.cod > 400) {
          return;
        }
        var weatherPoints = weatherData.list;
        weatherPoints.forEach(point => {
          // dt is in unix time, need to convert to js
          point.jsDay = new Date(point.dt * 1000).getDay();
        });

        var filteredWeatherData = [];
        Object.keys(weekDays).forEach(day => {
          var filteredPoints = weatherPoints.filter(
            point => point.jsDay === parseInt(day)
          );
          if (filteredPoints.length === 0) return;

          var aggregatedWeatherDataPoint = getAggregatedWeatherDataPoint(
            filteredPoints
          );
          filteredWeatherData.push({
            day: parseInt(day),
            weather: aggregatedWeatherDataPoint.weather,
            maxTemp: aggregatedWeatherDataPoint.maxTemp,
            minTemp: aggregatedWeatherDataPoint.minTemp
          });
        });
        setWeatherData(filteredWeatherData);
      });
  }

  function getAggregatedWeatherDataPoint(filteredPoints) {
    var aggregatedWeatherDataPoint = {
      maxTemp: Number.MIN_SAFE_INTEGER,
      minTemp: Number.MAX_SAFE_INTEGER,
      weather: ""
    };
    var weatherCounter = {
      Clear: 0,
      Cloud: 0,
      Snow: 0,
      Rain: 0
    };
    filteredPoints.forEach(point => {
      var weather = point.weather[0].main;
      if (weather === Constants.SUNNY) weatherCounter.Clear++;
      if (weather === Constants.CLOUDY) weatherCounter.Cloud++;
      if (weather === Constants.SNOWY) weatherCounter.Snow++;
      if (weather === Constants.RAINY) weatherCounter.Rain++;
      if (point.main.temp_max > aggregatedWeatherDataPoint.maxTemp)
        aggregatedWeatherDataPoint.maxTemp = point.main.temp_max;
      if (point.main.temp_min < aggregatedWeatherDataPoint.minTemp)
        aggregatedWeatherDataPoint.minTemp = point.main.temp_min;
    });

    aggregatedWeatherDataPoint.weather = Object.keys(
      weatherCounter
    ).reduce((a, b) => (weatherCounter[a] > weatherCounter[b] ? a : b));
    aggregatedWeatherDataPoint.maxTemp = Math.round(
      kelvinToFahrenheit(aggregatedWeatherDataPoint.maxTemp)
    );
    aggregatedWeatherDataPoint.minTemp = Math.round(
      kelvinToFahrenheit(aggregatedWeatherDataPoint.minTemp)
    );
    return aggregatedWeatherDataPoint;
  }

  function kelvinToFahrenheit(k) {
    return ((k - 273.15) * 9) / 5 + 32;
  }

  function createWeatherTiles(weatherData) {
    if (weatherData === null) return null;
    var currentDay = new Date().getDay();
    if (currentDay !== 0) {
      var currentDayIndex = weatherData.findIndex(
        data => data.day === currentDay
      );

      // order the weather data so that today's week day is first
      weatherData = weatherData
        .slice(currentDayIndex)
        .concat(weatherData.slice(0, currentDayIndex));
    }

    return weatherData.map(data => {
      data.day = weekDays[data.day];
      return (
        <li key={data.day}>
          <WeatherTile data={data} />
        </li>
      );
    });
  }

  var target = document.getElementById("root");
  var spinner = new Spinner(Constants.SPINNER_PARAMS).spin();

  target.appendChild(spinner.el);
  getWeatherData(spinner);
  useEffect(() => {
    const intervalId = setInterval(() => getWeatherData(spinner), 3600000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    spinner.stop();
  }, [weatherData]);
  var weatherTiles = createWeatherTiles(weatherData);

  return (
    <div className="Background">
      <div className="weather-forecast">
        <ul className="list-style">{weatherTiles}</ul>
      </div>
      <footer></footer>
    </div>
  );
}

export default App;
