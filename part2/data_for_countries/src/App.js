import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Weather from './components/Weather'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        var mappedCountries = 
          response.data.map(data => (
          {
            name: data.name.common,
            fullName: data.name.official,
            flag: data.flags.png,
            area: data.area,
            languages: data.languages,
            capital: data.capital,
            latlng: data.latlng,
          }
        ))
        setCountries(mappedCountries)
      })
  }

  useEffect(hook, [])

  const CountriesList = ({ countries }) => (
    <div>
        {countries.length === 1 
        ? <CountryPage country={countries[0]}/>
        : countries.map(country => 
          <div key={country.name}>
            {country.name} <button onClick={() => setFilter(country.fullName)}>show</button>
          </div>
        )}
    </div>
  )
  
  const CountryPage = ({ country }) => {
    return (
    <div>
      <h2>{country.fullName}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <p><b>languages: </b></p>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flag} alt={country.name}/>
      <Weather country={country} />
    </div>
  )}

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = filter === '' 
    ? countries
    : countries.filter(p => p.fullName.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <Filter onChange={handleFilterChange} />
      <CountriesList countries={countriesToShow}/>
    </div>
  );
}

export default App;
