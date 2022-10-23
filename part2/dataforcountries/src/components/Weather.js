import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState([]);

  const hook = () => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
      )
      .then((response) => {
        console.log(response.data.current);
        setWeather(response.data.current);
      });
  };

  useEffect(hook); // , []); // eslint-disable-line

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>
        <strong>temperature:</strong> {weather.temperature} Celcius
      </p>
      <img src={weather.weather_icons} alt="weather icon" />
      <p>
        <strong>wind:</strong> {weather.wind_speed} km/h direction{" "}
        {weather.wind_dir}
      </p>
    </div>
  );
};

export default Weather;
