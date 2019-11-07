import React from "react";
import "./style.css";
import WeatherTile from "./components/WeatherTile";

// EDH: 5345679
// api.openweathermap.org/data/2.5/forecast?id=5345679

var key = 'dad308e1e9508fb8704e0e28fd983111'
var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var days = [0, 1, 2, 3, 4, 5, 6]

function getWeeklyDays() {

  var currentDate = new Date();
  if (currentDate.getDay() === 0) {
    return weekdays;
  }
  days = days
  .slice(currentDate.getDay())
  .concat(days.slice(0, currentDate.getDay()));
  days.pop();
  weekdays = weekdays
    .slice(currentDate.getDay())
    .concat(weekdays.slice(0, currentDate.getDay()));
  weekdays.pop();
  return weekdays;
}

function createWeatherTiles() {
  return getWeeklyDays().map(day => 
    <li key={day}><WeatherTile className="Weather-Tile" day={day} /></li>
  )
}

// clear == sunny
// cloud == cloudy
// unix to js date conversion : unix * 1000
function App() {
  fetch('http://api.openweathermap.org/data/2.5/forecast?id=5345679&APPID=' + key)
    .then(response => response.json())
    .then(weatherData => {
      console.log(weatherData);
      var weatherPoints = weatherData.list;
      weatherPoints.forEach(point => {
        point.jsDay = new Date(point.dt * 1000).getDay();
      });
      days.forEach(day => {
        var filteredPoints = weatherPoints.filter(point => point.jsDay === day);
        var maxTemp = Number.MIN_SAFE_INTEGER, minTemp = Number.MAX_SAFE_INTEGER;
        filteredPoints.forEach(point => {
          if (point.main.temp_max > maxTemp) maxTemp = point.main.temp_max;
          if (point.main.temp_min < minTemp) minTemp = point.main.temp_min;
        })
      })

      var weatherTiles = createWeatherTiles(); // need to pass in weather data

      return (
        <div className="App">
          <ul className="list-style">{weatherTiles}</ul>
          <footer></footer>
        </div>
      );
    })  
  

  return (
    <div className="App">
      <ul className="list-style">{weatherTiles}</ul>
      <footer></footer>
    </div>
  );
}

export default App;
