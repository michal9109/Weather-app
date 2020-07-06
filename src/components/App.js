import React from "react";
import Form from "./Form";
import Result from "./Result";
import "../scss/App.scss";

import backgroundimg from "../assets/background.jpg";

const APIKey = "4075410fee48146ae4e0d5bbd47b7805";

class App extends React.Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressure: "",
    wind: "",
    clouds: "",
    icon: "",
    description: "",
    err: false,
  };

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value.length === 0) return;
    if (prevState.value !== this.state.value) {
      const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIKey}&units=metric`;

      fetch(API)
        .then((response) => {
          if (response.ok) {
            return response;
          }
          throw Error("Not working");
        })
        .then((response) => response.json())
        .then((data) => {
          const time = new Date().toLocaleString();
          this.setState((prevState) => ({
            err: false,
            date: time,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            temp: data.main.temp,
            pressure: data.main.pressure,
            wind: data.wind.speed,
            city: this.state.value,
            clouds: data.clouds.all,
            icon: data.weather[0].icon,
            description: data.weather[0].description,
          }));
        })
        .catch((err) => {
          this.setState((prevState) => ({
            err: true,
            city: prevState.value,
          }));
        });
    }
  }

  render() {
    return (
      <div className="app">
        <img className="app__background" src={backgroundimg} alt="sky" />
        <h1 className="app__header">Weather App</h1>
        <h2 className="app__header app__header--md ">
          Check out the weather in the city
        </h2>
        <div className="form">
          <Form value={this.state.value} change={this.handleInputChange} />
          <Result weather={this.state} />
        </div>
      </div>
    );
  }
}

export default App;
