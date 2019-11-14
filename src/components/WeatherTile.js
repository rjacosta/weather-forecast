import React, { Component } from "react";
import CloudyIcon from "../resources/cloudy_icon.svg";
import RainyIcon from "../resources/rainy_icon.svg";
import SnowyIcon from "../resources/snowy_icon.svg";
import SunnyIcon from "../resources/sunny_icon.svg";

import * as Constants from "../constants/index";

import "../style.css";

class WeatherTile extends Component {

  constructor(props) {
    super(props)
    this.getWeatherIcon = this.getWeatherIcon.bind(this);
  }

  render() {
    var weatherIcon = this.getWeatherIcon(this.props.data.weather);
    return (
      <div>
        <header>{this.props.data.day}</header>
        <img className="weather-icon" src={weatherIcon} alt={this.props.data.day} />
        <div>
          H: {this.props.data.maxTemp}{"\xB0"} L: {this.props.data.minTemp}{"\xB0"}
        </div>
      </div>
    );
  }

  getWeatherIcon(weather) {
    if (weather === Constants.CLOUDY) return CloudyIcon;
    if (weather === Constants.RAINY) return RainyIcon;
    if (weather === Constants.SNOWY) return SnowyIcon;
    if (weather === Constants.SUNNY) return SunnyIcon;
  }

}

export default WeatherTile;
