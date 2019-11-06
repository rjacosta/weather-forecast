import React from "react";
import "./style.css";
import WeatherTile from "./components/WeatherTile";

function getWeeklyDays() {
  var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  var currentDate = new Date();
  if (currentDate.getDay() === 0) {
    return weekdays;
  }
  return weekdays
    .slice(currentDate.getDay())
    .concat(weekdays.slice(0, currentDate.getDay()));
}

function App() {
  var weatherTiles = getWeeklyDays().map(day => 
    <li><WeatherTile className="Weather-Tile" day={day} /></li>
  )
  return (
    <div className="App">
      <ul className="list-style">{weatherTiles}</ul>
      <footer></footer>
    </div>
  );
}

export default App;
