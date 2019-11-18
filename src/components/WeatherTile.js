import React from "react";
import CloudyIcon from "../resources/cloudy_icon.svg";
import RainyIcon from "../resources/rainy_icon.svg";
import SnowyIcon from "../resources/snowy_icon.svg";
import SunnyIcon from "../resources/sunny_icon.svg";

import * as Constants from "../constants/index";

import "../style.css";

function WeatherTile(props) {
  function getWeatherIcon(weather) {
    if (weather === Constants.CLOUDY) return CloudyIcon;
    if (weather === Constants.RAINY) return RainyIcon;
    if (weather === Constants.SNOWY) return SnowyIcon;
    if (weather === Constants.SUNNY) return SunnyIcon;
  }

  var weatherIcon = getWeatherIcon(props.data.weather);
  return (
    <div>
      <header>{props.data.day}</header>
      <img
        className="weather-icon"
        src={weatherIcon}
        alt={props.data.day}
      />
      <div>
        H: {props.data.maxTemp}{"\xB0"} L: {props.data.minTemp}{"\xB0"}
      </div>
    </div>
  );
}

export default WeatherTile;
