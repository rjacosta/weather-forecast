import React, { Component } from "react";
import CloudyIcon from "../resources/cloudy_icon.svg";
import RainyIcon from "../resources/rainy_icon.svg";
import SnowyIcon from "../resources/snowy_icon.svg";
import SunnyIcon from "../resources/sunny_icon.svg";

import "../style.css";

var CLOUDY = "cloudy";
var RAINY = "rainy";
var SNOWY = "snowy";
var SUNNY = "sunny";

function getWeatherIcon(weather) {
  if (weather === CLOUDY) return CloudyIcon;
  if (weather === RAINY) return RainyIcon;
  if (weather === SNOWY) return SnowyIcon;
  if (weather === SUNNY) return SunnyIcon;
}

class WeatherTile extends Component {

  render() {
    var weatherIcon = getWeatherIcon(this.props.data.weather);
    return (
      <div>
        <header>{this.props.data.day}</header>
        <img className="weather-icon" src={weatherIcon} alt={this.props.data.day} />
        <div>
          {this.props.data.maxTemp}{"\xB0"} {this.props.data.minTemp}{"\xB0"}
        </div>
      </div>
    );
  }
}

export default WeatherTile;
