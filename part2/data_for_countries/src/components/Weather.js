import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY
const api_url = 'https://api.openweathermap.org/data/2.5/weather'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState([])

    const hook = () => {
        axios
        .get(`${api_url}?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`)
        .then(response => {
            setWeather({
                temperature: parseFloat(response.data.main.temp - 273).toFixed(2),
                wind: response.data.wind.speed,
                icon_url: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
            })
        })
    }

    useEffect(hook, [])

    return (
        <div>
            <h3><b>Weather in {country.name}</b></h3>
            <p>temperature {weather.temperature} Celsius</p>
            <img src={weather.icon_url}/>
            <p>wind {weather.wind} m/s</p>
        </div>
    )
}

export default Weather;