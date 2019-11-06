import React, { Component } from "react";
import CloudyIcon from "../resources/cloudy_icon.svg";
import RainyIcon from "../resources/rainy_icon.svg";
import SnowyIcon from "../resources/snowy_icon.svg";
import SunnyIcon from "../resources/sunny_icon.svg";

import "../style.css";

class WeatherTile extends Component {

  render() {
    return (
      <div>
        <header>{this.props.day}</header>
        <img className="weather-icon" src={CloudyIcon} alt="cloudyIcon" />
        <div>
          78{"\xB0"} 60{"\xB0"}
        </div>
      </div>
    );
  }
}

export default WeatherTile;
