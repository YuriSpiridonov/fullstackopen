import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const api_key =  process.env.REACT_APP_API_KEY
  const [ weather, setWeather ] = useState([])

  const hook = () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)  // f12fea132bf457cb4bf9d3b683f924ed  process.env.REACT_APP_API_KEY
      .then(response => {
        setWeather(response.data.current)
      })
    }

  useEffect(hook, [])

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p><strong>temperature:</strong> {weather.temperature} Celcius</p>
      <img src={weather.weather_icons} />
      <p><strong>wind:</strong> {weather.wind_speed} km/h direction {weather.wind_dir}</p>
    </div>
  )
}

export default Weather
